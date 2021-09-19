const { user, profile, role, permission } = require('../../../databases/models');
import { GetMyProfileTypes, ContextType } from './types';

const Resolvers = {
    Query: {
        getMyProfiles: async (_parent: unknown, _args: unknown, context: ContextType): Promise<GetMyProfileTypes> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }

            const response = await user.findOne({
                where: { id: context.user.id },
                include: [
                    {
                        model: profile
                    },
                    {
                        model: role,
                        include: [
                            {
                                model: permission,
                                as: 'permissions'
                            }
                        ]
                    }
                ]
            });

            return response;
        }
    }
};

export default Resolvers;
