import Authentication from '../../../utils/Authentication';

const { user } = require('../../../databases/models');
import { LoginType, LoginInput } from './types';

const Resolvers = {
    Mutation: {
        login: async (_parent: unknown, { username, password }: LoginInput): Promise<LoginType> => {
            const response = await user.findOne({
                where: { username }
            });

            if (!response) {
                throw new Error('Auth failed');
            }

            // check password
            const compare = await Authentication.passwordCompare(password, response.password);

            // generate token
            if (compare) {
                const token = await Authentication.generateToken(response.id, username);
                const res = {
                    user: response,
                    token
                };
                return res;
            }
            throw new Error('Auth failed');
        },
        // register: async (_parent: unknown, payload: RegisterInput): Promise<string> => {
        //     const { username, password } = payload;
        //     const hashedPassword: string = await Authentication.passwordHash(password);

        //     await user.create({ username, password: hashedPassword });

        //     return 'ok';
        // }
    }
};

export default Resolvers;
