const { role } = require('../../../databases/models');
const { permission } = require('../../../databases/models');
import { UsersType, ContextType, GetRoleByIdType, AddRoleType, UpdateRoleType, DeleteRoleType } from './types';

const Resolvers = {
    Query: {
        getRole: async (_parent: unknown, _args: unknown, context: ContextType): Promise<UsersType> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = await role.findAll({
                include: [
                    {
                        model: permission,
                        as: 'roles'
                    }
                ]
            });
            return response;
        },
        getRoleById: async (_parent: unknown, { id }: GetRoleByIdType, context: ContextType): Promise<UsersType> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = await role.findOne({
                where: { id },
                include: [
                    {
                        model: permission,
                        as: 'roles'
                    }
                ]
            });
            return response;
        }
    },
    Mutation: {
        addRole: async (_parent: unknown, { id, title, slug, description, active }: AddRoleType, context: ContextType): Promise<AddRoleType> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const roleResult = await role.create({ id, title, slug, description, active });
            return roleResult;
        },
        updateRole: async (_parent: unknown, { id, title, slug, description, active }: UpdateRoleType, context: ContextType): Promise<string> => {
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
                const result = await role.update(options, { where: { id } });
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
            const result = await role.destroy({where: {id}});
            if (result) {
                return 'Success';
            }
            return 'Something when wrong';
        }
    }
};

export default Resolvers;
