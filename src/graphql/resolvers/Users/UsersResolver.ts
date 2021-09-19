
import Authentication from '../../../utils/Authentication';
import { UsersType, ContextType, ChangePasswordType } from './types';
const { user } = require('../../../databases/models');

const Resolvers = {
    Query: {
        getUsers: async (_parent: unknown, _args: unknown, context: ContextType): Promise<UsersType> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = await user.findAll();
            return response;
        }
    },
    Mutation: {
        changePassword: async (_parent: unknown,{ old_password, password, confirm_password}: ChangePasswordType, context: ContextType): Promise<string> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const userRes = await user.findOne({where: {id: context.user.id}});

            // check match password
            const compare = await Authentication.passwordCompare(old_password, userRes.password);

            if (!compare) {
                throw new Error('Old password not match');
            }

            // check same password
            if(password !== confirm_password) {
                throw new Error('Password not match');
            }

            try {
                const passwordHash = await Authentication.passwordHash(password)
                const result = await user.update({password: passwordHash}, { where: { id: context.user.id } });
                if (result) {
                    return 'Success';
                }
                return 'Something when wrong';
            } catch (error) {
                throw new Error('Error change password');
            }
        },
    }
};

export default Resolvers;
