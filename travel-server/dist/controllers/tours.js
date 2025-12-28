"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTour = exports.updateTour = exports.createTour = exports.getTour = exports.getTours = void 0;
const database_1 = require("../config/database");
const Tour_1 = require("../models/Tour");
const getTours = async (req, res) => {
    try {
        const tourRepository = database_1.AppDataSource.getRepository(Tour_1.Tour);
        const tours = await tourRepository.find({
            order: { createdAt: 'DESC' }
        });
        return res.json({ success: true, data: tours });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getTours = getTours;
const getTour = async (req, res) => {
    try {
        const tourRepository = database_1.AppDataSource.getRepository(Tour_1.Tour);
        const tour = await tourRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        if (!tour) {
            return res.status(404).json({ success: false, message: 'Tour not found' });
        }
        return res.json({ success: true, data: tour });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getTour = getTour;
const createTour = async (req, res) => {
    try {
        const tourRepository = database_1.AppDataSource.getRepository(Tour_1.Tour);
        const tour = tourRepository.create(req.body);
        const savedTour = await tourRepository.save(tour);
        return res.status(201).json({ success: true, data: savedTour });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.createTour = createTour;
const updateTour = async (req, res) => {
    try {
        const tourRepository = database_1.AppDataSource.getRepository(Tour_1.Tour);
        const tour = await tourRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        if (!tour) {
            return res.status(404).json({ success: false, message: 'Tour not found' });
        }
        Object.assign(tour, req.body);
        const updatedTour = await tourRepository.save(tour);
        return res.json({ success: true, data: updatedTour });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateTour = updateTour;
const deleteTour = async (req, res) => {
    try {
        const tourRepository = database_1.AppDataSource.getRepository(Tour_1.Tour);
        const tour = await tourRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        if (!tour) {
            return res.status(404).json({ success: false, message: 'Tour not found' });
        }
        await tourRepository.remove(tour);
        return res.json({ success: true, message: 'Tour deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteTour = deleteTour;
//# sourceMappingURL=tours.js.map