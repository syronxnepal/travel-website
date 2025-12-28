"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShortTour = exports.updateShortTour = exports.createShortTour = exports.getShortTour = exports.getShortTours = void 0;
const database_1 = require("../config/database");
const ShortTour_1 = require("../models/ShortTour");
const getShortTours = async (req, res) => {
    try {
        const shortTourRepository = database_1.AppDataSource.getRepository(ShortTour_1.ShortTour);
        const shortTours = await shortTourRepository.find({
            order: { createdAt: 'DESC' }
        });
        return res.json({ success: true, data: shortTours });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getShortTours = getShortTours;
const getShortTour = async (req, res) => {
    try {
        const shortTourRepository = database_1.AppDataSource.getRepository(ShortTour_1.ShortTour);
        const shortTour = await shortTourRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        if (!shortTour) {
            return res.status(404).json({ success: false, message: 'Short tour not found' });
        }
        return res.json({ success: true, data: shortTour });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getShortTour = getShortTour;
const createShortTour = async (req, res) => {
    try {
        const shortTourRepository = database_1.AppDataSource.getRepository(ShortTour_1.ShortTour);
        const shortTour = shortTourRepository.create(req.body);
        const savedShortTour = await shortTourRepository.save(shortTour);
        return res.status(201).json({ success: true, data: savedShortTour });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.createShortTour = createShortTour;
const updateShortTour = async (req, res) => {
    try {
        const shortTourRepository = database_1.AppDataSource.getRepository(ShortTour_1.ShortTour);
        const shortTour = await shortTourRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        if (!shortTour) {
            return res.status(404).json({ success: false, message: 'Short tour not found' });
        }
        Object.assign(shortTour, req.body);
        const updatedShortTour = await shortTourRepository.save(shortTour);
        return res.json({ success: true, data: updatedShortTour });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateShortTour = updateShortTour;
const deleteShortTour = async (req, res) => {
    try {
        const shortTourRepository = database_1.AppDataSource.getRepository(ShortTour_1.ShortTour);
        const shortTour = await shortTourRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        if (!shortTour) {
            return res.status(404).json({ success: false, message: 'Short tour not found' });
        }
        await shortTourRepository.remove(shortTour);
        return res.json({ success: true, message: 'Short tour deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteShortTour = deleteShortTour;
//# sourceMappingURL=shortTours.js.map