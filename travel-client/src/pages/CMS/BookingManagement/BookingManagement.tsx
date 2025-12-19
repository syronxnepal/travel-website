// @ts-nocheck
import React, { useState } from 'react';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import Modal from 'src/components/CMS/Common/Modal/Modal';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  tourName: string;
  bookingDate: string;
  travelDate: string;
  guests: number;
  totalAmount: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

const BookingManagementContent: React.FC = () => {
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      tourName: 'Everest Base Camp Trek',
      bookingDate: '2024-01-15',
      travelDate: '2024-03-01',
      guests: 2,
      totalAmount: '$3,000',
      status: 'confirmed'
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1987654321',
      tourName: 'Cultural Heritage Tour',
      bookingDate: '2024-01-20',
      travelDate: '2024-02-15',
      guests: 4,
      totalAmount: '$4,800',
      status: 'pending'
    },
    {
      id: '3',
      customerName: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1122334455',
      tourName: 'Beach Paradise Tour',
      bookingDate: '2024-01-10',
      travelDate: '2024-04-01',
      guests: 2,
      totalAmount: '$1,800',
      status: 'completed'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState<Partial<Booking>>({});

  const columns = [
    {
      key: 'customerName',
      label: 'Customer',
      render: (value: string) => (
        <div className="booking-cms__title-cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'tourName',
      label: 'Tour Name'
    },
    {
      key: 'bookingDate',
      label: 'Booking Date',
      width: '110px'
    },
    {
      key: 'travelDate',
      label: 'Travel Date',
      width: '110px'
    },
    {
      key: 'guests',
      label: 'Guests',
      width: '80px'
    },
    {
      key: 'totalAmount',
      label: 'Total',
      width: '100px'
    },
    {
      key: 'status',
      label: 'Status',
      width: '100px',
      render: (_: string, item: Booking) => (
        <div className="booking-cms__status-cell">
          <span className={`status-badge ${item.status}`}>
            {item.status}
          </span>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditingBooking(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setFormData({ ...booking });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (booking: Booking) => {
    showDeleteConfirmation(booking, () => {
      performAction(
        () => setBookings(bookings.filter(b => b.id !== booking.id)),
        'Booking deleted successfully',
        'success'
      );
    });
  };

  const handleSave = () => {
    if (editingBooking) {
      performAction(
        () => {
          setBookings(bookings.map(booking => 
            booking.id === editingBooking.id 
              ? { ...formData as Booking }
              : booking
          ));
          setIsModalOpen(false);
          setEditingBooking(null);
          setFormData({});
        },
        'Booking updated successfully',
        'success'
      );
    } else {
      performAction(
        () => {
          const newBooking: Booking = {
            id: Date.now().toString(),
            customerName: formData.customerName || '',
            email: formData.email || '',
            phone: formData.phone || '',
            tourName: formData.tourName || '',
            bookingDate: formData.bookingDate || new Date().toISOString().split('T')[0],
            travelDate: formData.travelDate || '',
            guests: formData.guests || 1,
            totalAmount: formData.totalAmount || '',
            status: (formData.status as 'pending' | 'confirmed' | 'cancelled' | 'completed') || 'pending'
          };
          setBookings([...bookings, newBooking]);
          setIsModalOpen(false);
          setEditingBooking(null);
          setFormData({});
        },
        'Booking added successfully',
        'success'
      );
    }
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-section">
          <div className="cms-section__header">
            <div className="cms-section__header-content">
              <h3>Booking Management</h3>
              <p>Manage all customer bookings, track status, and monitor travel schedules</p>
            </div>
          </div>

          <div className="cms-section__content">
            <DataTable
              data={bookings}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No bookings found"
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingBooking ? 'Edit Booking' : 'Add New Booking'}
            size="lg"
          >
            <div className="cms-section__form">
              <FormField
                label="Customer Name"
                name="customerName"
                type="text"
                value={formData.customerName || ''}
                onChange={(value) => setFormData({ ...formData, customerName: value })}
                placeholder="Enter customer name"
                required
              />
              
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={(value) => setFormData({ ...formData, email: value })}
                placeholder="Enter email"
                required
              />
              
              <FormField
                label="Phone"
                name="phone"
                type="text"
                value={formData.phone || ''}
                onChange={(value) => setFormData({ ...formData, phone: value })}
                placeholder="Enter phone number"
                required
              />
              
              <FormField
                label="Tour Name"
                name="tourName"
                type="text"
                value={formData.tourName || ''}
                onChange={(value) => setFormData({ ...formData, tourName: value })}
                placeholder="Enter tour name"
                required
              />
              
              <FormField
                label="Booking Date"
                name="bookingDate"
                type="date"
                value={formData.bookingDate || ''}
                onChange={(value) => setFormData({ ...formData, bookingDate: value })}
                required
              />
              
              <FormField
                label="Travel Date"
                name="travelDate"
                type="date"
                value={formData.travelDate || ''}
                onChange={(value) => setFormData({ ...formData, travelDate: value })}
                required
              />
              
              <FormField
                label="Guests"
                name="guests"
                type="number"
                value={formData.guests?.toString() || '1'}
                onChange={(value) => setFormData({ ...formData, guests: parseInt(value) })}
                placeholder="Enter number of guests"
                required
                min="1"
              />
              
              <FormField
                label="Total Amount"
                name="totalAmount"
                type="text"
                value={formData.totalAmount || ''}
                onChange={(value) => setFormData({ ...formData, totalAmount: value })}
                placeholder="e.g., $3,000"
                required
              />
              
              <FormField
                label="Status"
                name="status"
                type="select"
                value={formData.status || 'pending'}
                onChange={(value) => setFormData({ ...formData, status: value as Booking['status'] })}
                options={['pending', 'confirmed', 'cancelled', 'completed']}
                required
              />
              
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingBooking ? 'Update' : 'Add'} Booking
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </CMSLayout>
  );
};

const BookingManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Booking',
        message: 'Are you sure you want to delete this booking?',
        type: 'booking'
      }}
    >
      <BookingManagementContent />
    </CRUDProvider>
  );
};

export default BookingManagement;

