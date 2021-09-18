import Authentication from '../../utils/Authentication';

const { user } = require('../../databases/models');
import { UsersType, LoginType, LoginInput, ContextType } from './types';

const Resolvers = {
    Query: {
        getUsers: async (_parent: unknown, _args: unknown, context: ContextType): Promise<UsersType> => {
            if(!context.user) {
                throw new Error('Not authenticated');
            }
            const response = await user.findAll();
            return response;
        }
    },
    Mutation: {
        login: async (_parent: unknown, { username, password }: LoginInput): Promise<LoginType> => {
            const response = await user.findOne({
                where: { username }
            });

            if(!response) {
                throw new Error('Auth failed');
            }

            // check password
            const compare = await Authentication.passwordCompare(password, response.password);

            // generate token
            if (compare) {
                const token = await Authentication.generateToken(user.id, username, response.password)
                const res = {
                    user: response,
                    token
                };
                return res;
            }
            throw new Error('Auth failed');
        }
    }
};

export default Resolvers;
