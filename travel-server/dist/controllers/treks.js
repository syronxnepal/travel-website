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
        const trekRepository = database_1.AppDataSource.getRepository(Trek_1.Trek);
        const trek = trekRepository.create(req.body);
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
        Object.assign(trek, req.body);
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