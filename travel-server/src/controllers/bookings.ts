import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Booking } from '../models/Booking';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2026-01-28.clover' })
  : null;

export const getBookings = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const { status, bookingType } = req.query;
    
    const where: any = {};
    if (status) where.status = status;
    if (bookingType) where.bookingType = bookingType;
    
    const bookings = await bookingRepository.find({
      where,
      order: { bookingDate: 'DESC', createdAt: 'DESC' }
    });
    
    return res.json({ success: true, data: bookings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBooking = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const booking = await bookingRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    return res.json({ success: true, data: booking });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createBooking = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      nationality,
      emergencyContact,
      emergencyPhone,
      specialRequests,
      bookingType,
      itemId,
      itemTitle,
      itemLocation,
      category,
      travelDate,
      selectedTime,
      numberOfPersons,
      basePrice,
      totalPrice,
      paymentMethod,
      stripePaymentIntentId,
      travelInsurance,
      privateGuide,
      privateTransport,
      mealUpgrade,
      additionalOptions
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'First name, last name, email, and phone are required' 
      });
    }

    // For custom packages, itemId can be 0, so check for null/undefined instead of falsy
    // numberOfPersons can be 0 theoretically, but we require at least 1 for bookings
    if (!bookingType || itemId === undefined || itemId === null || !itemTitle || !travelDate || numberOfPersons === undefined || numberOfPersons === null || numberOfPersons < 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Booking type, item ID, item title, travel date, and number of persons are required' 
      });
    }

    const isCustomPackage = bookingType === 'custom-package';

    // Pricing is optional for custom packages; required for other booking types
    if (!isCustomPackage && (basePrice === undefined || basePrice === null || totalPrice === undefined || totalPrice === null)) {
      return res.status(400).json({
        success: false,
        message: 'Base price and total price are required'
      });
    }

    const basePriceValue = isCustomPackage ? (parseFloat(basePrice) || 0) : parseFloat(basePrice);
    const totalPriceValue = isCustomPackage ? (parseFloat(totalPrice) || 0) : parseFloat(totalPrice);

    const bookingRepository = AppDataSource.getRepository(Booking);

    const normalizedPaymentMethod = (paymentMethod || 'cash-after-delivery') as 'cash-after-delivery' | 'stripe';

    // If Stripe is selected, verify payment before saving booking
    if (normalizedPaymentMethod === 'stripe') {
      if (!stripe) {
        return res.status(500).json({
          success: false,
          message: 'Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables.'
        });
      }

      if (!stripePaymentIntentId) {
        return res.status(400).json({
          success: false,
          message: 'stripePaymentIntentId is required for Stripe payments'
        });
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(String(stripePaymentIntentId));
      if (paymentIntent.status !== 'succeeded') {
        return res.status(400).json({
          success: false,
          message: `Stripe payment not completed. Current status: ${paymentIntent.status}`
        });
      }

      const expectedAmount = Math.round(Number(totalPriceValue) * 100);
      if (Number.isFinite(expectedAmount) && paymentIntent.amount !== expectedAmount) {
        return res.status(400).json({
          success: false,
          message: 'Stripe payment amount mismatch'
        });
      }
    }

    const booking = bookingRepository.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      dateOfBirth: dateOfBirth || undefined,
      nationality: nationality?.trim() || undefined,
      emergencyContact: emergencyContact?.trim() || undefined,
      emergencyPhone: emergencyPhone?.trim() || undefined,
      specialRequests: specialRequests?.trim() || undefined,
      bookingType: bookingType as 'trek' | 'tour' | 'short-tour' | 'custom-package',
      itemId: parseInt(itemId),
      itemTitle: itemTitle.trim(),
      itemLocation: itemLocation?.trim() || undefined,
      category: category?.trim() || undefined,
      travelDate: new Date(travelDate),
      selectedTime: selectedTime?.trim() || undefined,
      numberOfPersons: parseInt(numberOfPersons) || 1,
      basePrice: basePriceValue,
      totalPrice: totalPriceValue,
      paymentMethod: normalizedPaymentMethod,
      paymentStatus: normalizedPaymentMethod === 'stripe' ? 'completed' : 'pending',
      stripePaymentIntentId: normalizedPaymentMethod === 'stripe' ? String(stripePaymentIntentId) : undefined,
      travelInsurance: travelInsurance === true || travelInsurance === 'true',
      privateGuide: privateGuide === true || privateGuide === 'true',
      privateTransport: privateTransport === true || privateTransport === 'true',
      mealUpgrade: mealUpgrade === true || mealUpgrade === 'true',
      additionalOptions: Array.isArray(additionalOptions) ? additionalOptions : undefined,
      status: normalizedPaymentMethod === 'stripe' ? 'confirmed' : 'pending',
      bookingDate: new Date()
    });
    
    const savedBooking = await bookingRepository.save(booking);
    return res.status(201).json({ success: true, data: savedBooking });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBooking = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const booking = await bookingRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      nationality,
      emergencyContact,
      emergencyPhone,
      specialRequests,
      travelDate,
      selectedTime,
      numberOfPersons,
      basePrice,
      totalPrice,
      paymentStatus,
      travelInsurance,
      privateGuide,
      privateTransport,
      mealUpgrade,
      additionalOptions,
      status
    } = req.body;

    if (firstName !== undefined) booking.firstName = firstName.trim();
    if (lastName !== undefined) booking.lastName = lastName.trim();
    if (email !== undefined) booking.email = email.trim().toLowerCase();
    if (phone !== undefined) booking.phone = phone.trim();
    if (dateOfBirth !== undefined) booking.dateOfBirth = dateOfBirth || undefined;
    if (nationality !== undefined) booking.nationality = nationality?.trim() || undefined;
    if (emergencyContact !== undefined) booking.emergencyContact = emergencyContact?.trim() || undefined;
    if (emergencyPhone !== undefined) booking.emergencyPhone = emergencyPhone?.trim() || undefined;
    if (specialRequests !== undefined) booking.specialRequests = specialRequests?.trim() || undefined;
    if (travelDate !== undefined) booking.travelDate = new Date(travelDate);
    if (selectedTime !== undefined) booking.selectedTime = selectedTime?.trim() || undefined;
    if (numberOfPersons !== undefined) booking.numberOfPersons = parseInt(numberOfPersons) || 1;
    if (basePrice !== undefined) booking.basePrice = parseFloat(basePrice);
    if (totalPrice !== undefined) booking.totalPrice = parseFloat(totalPrice);
    if (paymentStatus !== undefined) booking.paymentStatus = paymentStatus as 'pending' | 'completed' | 'failed';
    if (travelInsurance !== undefined) booking.travelInsurance = travelInsurance === true || travelInsurance === 'true';
    if (privateGuide !== undefined) booking.privateGuide = privateGuide === true || privateGuide === 'true';
    if (privateTransport !== undefined) booking.privateTransport = privateTransport === true || privateTransport === 'true';
    if (mealUpgrade !== undefined) booking.mealUpgrade = mealUpgrade === true || mealUpgrade === 'true';
    if (additionalOptions !== undefined) booking.additionalOptions = Array.isArray(additionalOptions) ? additionalOptions : undefined;
    if (status !== undefined) booking.status = status as 'pending' | 'confirmed' | 'cancelled' | 'completed';
    
    const updatedBooking = await bookingRepository.save(booking);
    return res.json({ success: true, data: updatedBooking });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBooking = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const booking = await bookingRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    await bookingRepository.remove(booking);
    return res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

