"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tours_1 = require("../controllers/tours");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', tours_1.getTours);
router.get('/:id', tours_1.getTour);
router.post('/', auth_1.authenticate, (0, auth_1.authorize)('admin', 'editor'), tours_1.createTour);
router.put('/:id', auth_1.authenticate, (0, auth_1.authorize)('admin', 'editor'), tours_1.updateTour);
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)('admin', 'editor'), tours_1.deleteTour);
exports.default = router;
//# sourceMappingURL=tours.js.map