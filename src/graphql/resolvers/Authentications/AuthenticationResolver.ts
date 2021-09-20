import Authentication from '../../../utils/Authentication';

const { user, profile, role } = require('../../../databases/models');
const sequelize = require('../../../databases/models').sequelize;
import { LoginType, LoginInput, RegisterInput } from './types';

const Resolvers = {
    Mutation: {
        login: async (_parent: unknown, { username, password }: LoginInput): Promise<LoginType> => {
            const response = await user.findOne({
                where: { username }
            });

            if (!response) {
                throw new Error('Auth failed');
            }

            // check password
            const compare = await Authentication.passwordCompare(password, response.password);

            // generate token
            if (compare) {
                // update last login
                await user.update(
                    { last_login: new Date() },
                    {
                        where: { id: response.id }
                    }
                );

                const token = await Authentication.generateToken(response.id, username);
                const res = {
                    user: response,
                    token
                };
                return res;
            }
            throw new Error('Auth failed');
        },
        register: async (_parent: unknown, payload: RegisterInput): Promise<string> => {
            const { first_name, middle_name, last_name, phone_number, email, username, password } = payload;
            try {
                const result = await sequelize.transaction(async (t: any) => {
                    // Then, we do some calls passing this transaction as an option:
                    let optionsProfile = {};
                    if (first_name) {
                        optionsProfile = { ...optionsProfile, first_name };
                    }
                    if (middle_name) {
                        optionsProfile = { ...optionsProfile, middle_name };
                    }
                    if (last_name) {
                        optionsProfile = { ...optionsProfile, last_name };
                    }
                    if (phone_number) {
                        optionsProfile = { ...optionsProfile, phone_number };
                    }
                    const profileReturn = await profile.create(optionsProfile, { transaction: t });

                    const responseRole = await role.findOne({ where: { slug: 'user' } }, { transaction: t });

                    let optionsUser = {};

                    if (profileReturn) {
                        optionsUser = { ...optionsUser, ...{ profile_id: profileReturn.id } };
                    }
                    if (responseRole) {
                        optionsUser = { ...optionsUser, ...{ role_id: responseRole.id } };
                    }
                    if (email) {
                        optionsUser = { ...optionsUser, email };
                    }
                    if (username) {
                        optionsUser = { ...optionsUser, username };
                    }
                    if (password) {
                        optionsUser = { ...optionsUser, password };
                    }

                    optionsUser = { ...optionsUser, ...{ registered_at: new Date() } };
                    optionsUser = { ...optionsUser, ...{ last_login: new Date() } };

                    const responseUser = await user.create(optionsUser, { transaction: t });

                    return responseUser
                });

                if (result) {
                    return 'Success';
                }
                return 'Something when wrong';

                // If the execution reaches this line, the transaction has been committed successfully
                // `result` is whatever was returned from the transaction callback (the `user`, in this case)
            } catch (error) {
                // If the execution reaches this line, an error occurred.
                // The transaction has already been rolled back automatically by Sequelize!
                throw new Error('Register failed');
            }
        }
    }
};

export default Resolvers;
