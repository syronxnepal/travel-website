"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const Trek_1 = require("../models/Trek");
const Tour_1 = require("../models/Tour");
const ShortTour_1 = require("../models/ShortTour");
const Blog_1 = require("../models/Blog");
const Page_1 = require("../models/Page");
const Testimonial_1 = require("../models/Testimonial");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User_1.User, Trek_1.Trek, Tour_1.Tour, ShortTour_1.ShortTour, Blog_1.Blog, Page_1.Page, Testimonial_1.Testimonial],
    synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in dev
    logging: process.env.NODE_ENV === 'development',
});
const connectDB = async () => {
    try {
        await exports.AppDataSource.initialize();
        const options = exports.AppDataSource.options;
        console.log(`✅ PostgreSQL Connected: ${options.host}:${options.port}/${options.database}`);
    }
    catch (error) {
        console.error('❌ PostgreSQL connection error:', error);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map