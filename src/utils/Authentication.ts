import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
    public static passwordHash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    };

    public static passwordCompare = async (text: string, encryptedText: string): Promise<boolean> => {
        const result = await bcrypt.compare(text, encryptedText);
        return result;
    };

    public static generateToken = (id: number, username: string, password: string): string => {
        const secretKey: string = process.env.JWT_SECRET_KEY || 'secret';

        const token: string = jwt.sign({ id, username, password }, secretKey);
        return token;
    };

    public static getUser = async (token: string): Promise<any> => {
        try {
            if (token) {
                const secretKey = process.env.JWT_SECRET_KEY || 'secret';
                const credential: any = jwt.verify(token, secretKey);
                return credential;
            }
            return null;
        } catch (error) {
            return null;
        }
    };
}

export default Authentication;
