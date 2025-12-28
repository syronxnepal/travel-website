"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const treks_1 = require("../controllers/treks");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', treks_1.getTreks);
router.get('/:id', treks_1.getTrek);
router.post('/', auth_1.authenticate, (0, auth_1.authorize)('admin', 'editor'), treks_1.createTrek);
router.put('/:id', auth_1.authenticate, (0, auth_1.authorize)('admin', 'editor'), treks_1.updateTrek);
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)('admin', 'editor'), treks_1.deleteTrek);
exports.default = router;
//# sourceMappingURL=treks.js.map