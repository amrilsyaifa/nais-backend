const { permission } = require('../../../databases/models');
import { GetPermissionType, ContextType, GetPermissionByIdType, AddPermissionType, UpdatePermissionType, DeletePermissionType } from './types';

const Resolvers = {
    Query: {
        getPermissions: async (_parent: unknown, _args: unknown, context: ContextType): Promise<GetPermissionType> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = await permission.findAll();
            return response;
        },
        getPermission: async (_parent: unknown, { id }: GetPermissionByIdType, context: ContextType): Promise<GetPermissionType> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = await permission.findOne({
                where: { id }
            });
            return response;
        }
    },
    Mutation: {
        addPermission: async (
            _parent: unknown,
            { id, title, slug, description, active }: AddPermissionType,
            context: ContextType
        ): Promise<AddPermissionType> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const permissionResult = await permission.create({ id, title, slug, description, active });
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
                const result = await permission.update(options, { where: { id } });
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
            const result = await permission.destroy({ where: { id } });
            if (result) {
                return 'Success';
            }
            return 'Something when wrong';
        }
    }
};

export default Resolvers;
