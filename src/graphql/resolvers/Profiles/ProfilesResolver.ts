const { user, profile, role, permission } = require('../../../databases/models');
import { GetMyProfileTypes, ContextType, getProfileById, UpdateMyProfile } from './types';

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

            const response = await profile.findOne({ where: { id } });

            return response;
        }
    },
    Mutation: {
        updateMyProfiles: async (
            _parent: unknown,
            { first_name, middle_name, last_name, phone_number, address, zip_code, place_of_birth, birthday }: UpdateMyProfile,
            context: ContextType
        ): Promise<string> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }

            const userResponse = await user.findOne({
                where: { id: context.user.id }
            });

            if (!userResponse) {
                throw new Error('Not authenticated');
            }

            try {
                let options = {};

                if (first_name) {
                    options = { ...options, first_name };
                }
                if (middle_name) {
                    options = { ...options, middle_name };
                }
                if (last_name) {
                    options = { ...options, last_name };
                }
                if (phone_number) {
                    options = { ...options, phone_number };
                }
                if (address) {
                    options = { ...options, address };
                }
                if (zip_code) {
                    options = { ...options, zip_code };
                }
                if (place_of_birth) {
                    options = { ...options, place_of_birth };
                }
                if (birthday) {
                    options = { ...options, birthday };
                }

                const result = await profile.update(options, { where: { id: userResponse.profile_id } });

                if (result) {
                    return 'Success';
                }
                return 'Something when wrong';
            } catch (err) {
                throw new Error('Error update role');
            }
        }
    }
};

export default Resolvers;
