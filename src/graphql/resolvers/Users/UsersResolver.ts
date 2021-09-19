const { user } = require('../../../databases/models');
import { UsersType, ContextType } from './types';

const Resolvers = {
    Query: {
        getUsers: async (_parent: unknown, _args: unknown, context: ContextType): Promise<UsersType> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = await user.findAll();
            return response;
        }
    }
};

export default Resolvers;
