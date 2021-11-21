import path from 'path';
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const StartWhatsappServer = (): any => {
    const SESSION_FILE_PATH = path.join(__dirname, '../../', 'public/cache/whatsapp-session.json');

    let sessionCfg;
    if (fs.existsSync(SESSION_FILE_PATH)) {
        sessionCfg = require(SESSION_FILE_PATH);
    }

    const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });

    client.on('qr', (qr: any) => {
        // Generate and scan this code with your phone
        // eslint-disable-next-line no-console
        qrcode.generate(qr);
    });

    client.on('authenticated', (session: any) => {
        // eslint-disable-next-line no-console
        console.log('AUTHENTICATED', session);
        sessionCfg = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err: any) {
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

    client.on('message', (msg: { body: string; reply: (arg0: string) => void }) => {
        if (msg.body == '!ping') {
            msg.reply('pong');
        }
    });

    client.initialize();
    return client;
};

export default StartWhatsappServer;
