import { RolesModel } from '../../../databases/models/roles.model';
import { ContextType, GetRoleByIdType, AddRoleType, UpdateRoleType, DeleteRoleType } from './types';

const Resolvers = {
    Query: {
        getRoles: async (_parent: unknown, _args: unknown, context: ContextType): Promise<any> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = RolesModel.find().populate("permissions");
            return response;
        },
        getRole: async (_parent: unknown, { id }: GetRoleByIdType, context: ContextType): Promise<any> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = await RolesModel.findById({ _id: id }).populate("permissions");
            return response;
        }
    },
    Mutation: {
        addRole: async (_parent: unknown, { title, slug, description, active , permissions}: AddRoleType, context: ContextType): Promise<any> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }

            const roleResult = await RolesModel.create({ title, slug, description, active , permissions: permissions ? permissions: []});
            roleResult.save();
            return roleResult;
        },
        updateRole: async (_parent: unknown, { id, title, slug, description, active, permissions }: UpdateRoleType, context: ContextType): Promise<string> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            try {
                let options = {};
                if (title) {
                    options = { ...options, title };
                }
                if (slug) {
                    options = { ...options, slug };
                }
                if (description) {
                    options = { ...options, description };
                }
                if (active) {
                    options = { ...options, active };
                }
                if (permissions) {
                    options = { ...options, permissions };
                }
                const result = await RolesModel.findByIdAndUpdate( { _id: id }, options, { new: true });
                if (result) {
                    return 'Success';
                }
                return 'Something when wrong';
            } catch (err) {
                throw new Error('Error update role');
            }
        },
        deleteRole: async (_parent: unknown, { id }: DeleteRoleType, context: ContextType): Promise<string> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const result = await RolesModel.deleteOne({ _id: id });
            if (result) {
                return 'Success';
            }
            return 'Something when wrong';
        }
    }
};

export default Resolvers;
