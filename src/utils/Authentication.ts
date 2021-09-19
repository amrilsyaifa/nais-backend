import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {CredentialProps} from './types'

class Authentication {
    public static passwordHash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    };

    public static passwordCompare = async (text: string, encryptedText: string): Promise<boolean> => {
        const result = await bcrypt.compare(text, encryptedText);
        return result;
    };

    public static generateToken = (id: number, username: string): string => {
        const secretKey: string = process.env.JWT_SECRET_KEY || 'secret';

        const token: string = jwt.sign({ id, username }, secretKey, {expiresIn: "1d"});
        return token;
    };

    public static getUser = async (token: string): Promise<any> => {
        try {
            if (token) {
                const secretKey = process.env.JWT_SECRET_KEY || 'secret';
                const credential: CredentialProps | any = jwt.verify(token, secretKey);
                return credential;
            }
            return null;
        } catch (error) {
            return null;
        }
    };
}

export default Authentication;
