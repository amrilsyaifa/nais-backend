import { PermissionsModel } from '../../../databases/models/permissions.model';
import { ContextType, GetPermissionByIdType, AddPermissionType, UpdatePermissionType, DeletePermissionType } from './types';

const Resolvers = {
    Query: {
        getPermissions: async (_parent: unknown, _args: unknown, context: ContextType): Promise<any> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = await PermissionsModel.find();
            return response;
        },
        getPermission: async (_parent: unknown, { id }: GetPermissionByIdType, context: ContextType): Promise<any> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = await PermissionsModel.findById({ _id: id });
            return response;
        }
    },
    Mutation: {
        addPermission: async (
            _parent: unknown,
            { title, slug, description, active }: AddPermissionType,
            context: ContextType
        ): Promise<AddPermissionType> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const permissionResult = await PermissionsModel.create({ title, slug, description, active });
            return permissionResult;
        },
        updatePermission: async (
            _parent: unknown,
            { id, title, slug, description, active }: UpdatePermissionType,
            context: ContextType
        ): Promise<string> => {
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
                const result = await PermissionsModel.findByIdAndUpdate({ _id: id }, options, { new: true });
                if (result) {
                    return 'Success';
                }
                return 'Something when wrong';
            } catch (err) {
                throw new Error('Error update permission');
            }
        },
        deletePermission: async (_parent: unknown, { id }: DeletePermissionType, context: ContextType): Promise<string> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const result = await PermissionsModel.deleteOne({ _id: id });
            if (result) {
                return 'Success';
            }
            return 'Something when wrong';
        }
    }
};

export default Resolvers;
