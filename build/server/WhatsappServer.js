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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const StartWhatsappServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const SESSION_FILE_PATH = path_1.default.join(__dirname, '../', 'whatsapp-session.json');
    // eslint-disable-next-line no-console
    // console.log('aaa ', configFilename);
    let sessionCfg;
    if (fs.existsSync(SESSION_FILE_PATH)) {
        sessionCfg = require(SESSION_FILE_PATH);
    }
    const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });
    client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        // eslint-disable-next-line no-console
        console.log('QR RECEIVED', qr);
        qrcode.generate(qr);
    });
    client.on('authenticated', (session) => {
        // eslint-disable-next-line no-console
        console.log('AUTHENTICATED', session);
        sessionCfg = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) {
                // eslint-disable-next-line no-console
                console.error(err);
            }
        });
    });
    client.on('ready', () => {
        // eslint-disable-next-line no-console
        console.log('Client is ready!');
    });
    client.on('message', (msg) => {
        if (msg.body == '!ping') {
            msg.reply('pong');
        }
    });
    client.initialize();
});
exports.default = StartWhatsappServer;
