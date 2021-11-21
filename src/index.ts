import { config as dotenv } from 'dotenv';
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload';

// Server
import { RootServer } from './server';

// Routes
import WhatsAppRoutes from './routers/WhatsAppRoutes';

const PORT = process.env.PORT || 4000;

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(graphqlUploadExpress());
    }

    protected routes(): void {
        this.app.route('/').get((req: Request, res: Response) => {
            res.send('This App for super human, :D');
        });

        this.app.use('/api/v1/whatsapp', WhatsAppRoutes);
    }
}

RootServer(App, PORT);
