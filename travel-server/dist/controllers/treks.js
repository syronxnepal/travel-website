"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrek = exports.updateTrek = exports.createTrek = exports.getTrek = exports.getTreks = void 0;
const database_1 = require("../config/database");
const Trek_1 = require("../models/Trek");
const getTreks = async (req, res) => {
    try {
        const trekRepository = database_1.AppDataSource.getRepository(Trek_1.Trek);
        const treks = await trekRepository.find({
            order: { createdAt: 'DESC' }
        });
        return res.json({ success: true, data: treks });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getTreks = getTreks;
const getTrek = async (req, res) => {
    try {
        const trekRepository = database_1.AppDataSource.getRepository(Trek_1.Trek);
        const trek = await trekRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        if (!trek) {
            return res.status(404).json({ success: false, message: 'Trek not found' });
        }
        return res.json({ success: true, data: trek });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getTrek = getTrek;
const createTrek = async (req, res) => {
    try {
        const { image, ...trekData } = req.body;
        // Validate required fields
        if (!trekData.title || !trekData.location || !trekData.description) {
            return res.status(400).json({
                success: false,
                message: 'Title, location, and description are required'
            });
        }
        // Validate image URL (must be a string)
        if (!image || typeof image !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Image URL is required and must be a string'
            });
        }
        // Ensure image is a valid URL string (can be relative or absolute)
        const imageUrl = image.trim();
        if (imageUrl.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Image URL cannot be empty'
            });
        }
        const trekRepository = database_1.AppDataSource.getRepository(Trek_1.Trek);
        const trek = trekRepository.create({
            ...trekData,
            image: imageUrl, // Store the image URL string
            // Ensure numeric fields are properly converted
            reviewCount: trekData.reviewCount ? parseInt(trekData.reviewCount) || 0 : 0,
        });
        const savedTrek = await trekRepository.save(trek);
        return res.status(201).json({ success: true, data: savedTrek });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.createTrek = createTrek;
const updateTrek = async (req, res) => {
    try {
        const trekRepository = database_1.AppDataSource.getRepository(Trek_1.Trek);
        const trek = await trekRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        if (!trek) {
            return res.status(404).json({ success: false, message: 'Trek not found' });
        }
        const { image, ...updateData } = req.body;
        // If image is provided, validate it's a string
        if (image !== undefined) {
            if (typeof image !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Image must be a URL string'
                });
            }
            const imageUrl = image.trim();
            if (imageUrl.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Image URL cannot be empty'
                });
            }
            updateData.image = imageUrl;
        }
        // Ensure numeric fields are properly converted if provided
        if (updateData.reviewCount !== undefined) {
            updateData.reviewCount = parseInt(updateData.reviewCount) || 0;
        }
        Object.assign(trek, updateData);
        const updatedTrek = await trekRepository.save(trek);
        return res.json({ success: true, data: updatedTrek });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateTrek = updateTrek;
const deleteTrek = async (req, res) => {
    try {
        const trekRepository = database_1.AppDataSource.getRepository(Trek_1.Trek);
        const trek = await trekRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        if (!trek) {
            return res.status(404).json({ success: false, message: 'Trek not found' });
        }
        await trekRepository.remove(trek);
        return res.json({ success: true, message: 'Trek deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteTrek = deleteTrek;
//# sourceMappingURL=treks.js.map