"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const database_1 = __importDefault(require("./config/database"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// CORS
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
// Body parsing middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Compression middleware
app.use((0, compression_1.default)());
// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Travel CMS Server is running',
        timestamp: new Date().toISOString()
    });
});
// Import routes
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const treks_1 = __importDefault(require("./routes/treks"));
const tours_1 = __importDefault(require("./routes/tours"));
const shortTours_1 = __importDefault(require("./routes/shortTours"));
const blogs_1 = __importDefault(require("./routes/blogs"));
const testimonials_1 = __importDefault(require("./routes/testimonials"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const contacts_1 = __importDefault(require("./routes/contacts"));
const pages_1 = __importDefault(require("./routes/pages"));
const cms_1 = __importDefault(require("./routes/cms"));
// Mount routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/treks', treks_1.default);
app.use('/api/tours', tours_1.default);
app.use('/api/short-tours', shortTours_1.default);
app.use('/api/blogs', blogs_1.default);
app.use('/api/testimonials', testimonials_1.default);
app.use('/api/bookings', bookings_1.default);
app.use('/api/contacts', contacts_1.default);
app.use('/api/pages', pages_1.default);
app.use('/api/cms', cms_1.default);
// Error handling middleware
app.use(errorHandler_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});
// Connect to database
(0, database_1.default)();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map