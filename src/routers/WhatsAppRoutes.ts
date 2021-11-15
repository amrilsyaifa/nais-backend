import BaseRoutes from './BaseRouter';
import { WhatsappServer } from '../server';

const clientWhatsapp = WhatsappServer();

class WhatsAppRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post('/send-message', function (req, res) {
            const number = req.body.number;
            const message = req.body.message;
            clientWhatsapp
                .sendMessage(number, message)
                .then((response: any) => {
                    res.status(200).json({
                        status: true,
                        response: response
                    });
                })
                .catch((err: any) => {
                    res.status(500).json({
                        status: false,
                        response: err
                    });
                });
        });
    }
}

export default new WhatsAppRoutes().router;
