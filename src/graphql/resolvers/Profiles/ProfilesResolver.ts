const { user, profile, role, permission } = require('../../../databases/models');
import { GetMyProfileTypes, ContextType, getProfileById } from './types';

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
        },
        getProfiles: async (_parent: unknown, _args: unknown, context: ContextType): Promise<GetMyProfileTypes> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }

            const response = await profile.findAll({});

            return response;
        },
        getProfile: async (_parent: unknown, { id }: getProfileById, context: ContextType): Promise<GetMyProfileTypes> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }

            const response = await profile.findOne({where: { id },});

            return response;
        }
    }
};

export default Resolvers;
