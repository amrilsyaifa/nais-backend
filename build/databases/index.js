"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = require('./config/database');
const SyncDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    // Testing database connection
    const mode = process.env.development || "development";
    const sequelize = new sequelize_1.Sequelize(db[mode]);
    try {
        yield sequelize.authenticate();
        // eslint-disable-next-line no-console
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Unable to connect to the database:', error);
    }
});
exports.default = SyncDatabase;
