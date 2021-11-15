import { UsersModel } from '../../../databases/models/users.model';
import { ProfilesModel } from '../../../databases/models/profiles.model';
import { RolesModel } from '../../../databases/models/roles.model';
import Authentication from '../../../utils/Authentication';
import { LoginInput, RegisterInput } from './types';

const Resolvers = {
    Mutation: {
        login: async (_parent: unknown, { username, password }: LoginInput): Promise<any> => {
            const response: any = await UsersModel.findOne({ username: username })
                .populate('profile_id')
                .populate({
                    path: 'role_id',
                    populate: {
                        path: 'permissions',
                        model: 'Permissions'
                    }
                });

            if (response === undefined || response === null) {
                throw new Error('Auth failed');
            }

            // check password
            const compare = await Authentication.passwordCompare(password, response.password);

            // generate token
            if (compare) {
                // update last login
                await UsersModel.findByIdAndUpdate({ _id: response.id }, { last_login: new Date() });

                const token = await Authentication.generateToken(response._id.toString(), username);
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
                const profileReturn: any = await ProfilesModel.create([optionsProfile]);

                const responseRole: any = await RolesModel.findOne({ slug: 'user' });

                let optionsUser = {};

                if (email) {
                    optionsUser = { ...optionsUser, email };
                }
                if (username) {
                    optionsUser = { ...optionsUser, username };
                }
                if (password) {
                    const passwordHash = await Authentication.passwordHash(password);
                    optionsUser = { ...optionsUser, password: passwordHash };
                }

                if (profileReturn) {
                    optionsUser = { ...optionsUser, ...{ profile_id: profileReturn.id } };
                }
                if (responseRole) {
                    optionsUser = { ...optionsUser, ...{ role_id: responseRole.id } };
                }

                optionsUser = { ...optionsUser, ...{ registered_at: new Date() } };
                optionsUser = { ...optionsUser, ...{ last_login: new Date() } };

                const responseUser = await UsersModel.create(optionsUser);

                if (responseUser) {
                    return 'Success';
                }
                return 'Something when wrong';

                // If the execution reaches this line, the transaction has been committed successfully
                // `result` is whatever was returned from the transaction callback (the `user`, in this case)
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log('isi error ', error);
                // If the execution reaches this line, an error occurred.
                // The transaction has already been rolled back automatically by Sequelize!
                throw new Error('Register failed');
            }
        }
    }
};

export default Resolvers;
