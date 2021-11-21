import { UsersModel } from '../../../databases/models/users.model';
import { ProfilesModel } from '../../../databases/models/profiles.model';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import { ContextType, getProfileById, UpdateMyProfile, UpdateImageProfile, FileTypes, TypeUserGet } from './types';

const pathURL = 'images/profiles/';

const processUpload = async (file: any, profile: any) => {
    const { createReadStream, mimetype } = await file;
    const extension = mime.extension(mimetype);
    const stream = createReadStream();
    const newName = `${profile.first_name}${profile.middle_name ? '-' + profile.middle_name : ''}${
        profile.last_name ? '-' + profile.last_name : ''
    }.${extension}`;
    if (!(profile.image === 'profile.jpg')) {
        const pathNameUnlink = path.join(__dirname, `../../../../`, `public/${pathURL}${profile.image}`);
        fs.unlinkSync(pathNameUnlink);
    }
    const pathName = path.join(__dirname, `../../../../`, `public/${pathURL}${newName}`);
    await stream.pipe(fs.createWriteStream(pathName));

    return { path: pathURL + newName, mimetype, filename: newName };
};

const Resolvers = {
    Query: {
        getMyProfiles: async (_parent: unknown, _args: unknown, context: ContextType): Promise<any> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }

            // const response = await user.findOne({
            //     where: { id: context.user.id },
            //     include: [
            //         {
            //             model: profile
            //         },
            //         {
            //             model: role,
            //             include: [
            //                 {
            //                     model: permission,
            //                     as: 'permissions'
            //                 }
            //             ]
            //         }
            //     ]
            // });

            const response = await UsersModel.findById({ _id: context.user.id });

            return response;
        },
        getProfiles: async (_parent: unknown, _args: unknown, context: ContextType): Promise<any> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }

            const response = await ProfilesModel.find();

            return response;
        },
        getProfile: async (_parent: unknown, { id }: getProfileById, context: ContextType): Promise<any> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }

            const response = await ProfilesModel.findById({ _id: id });

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

            const userResponse = await UsersModel.findById({ _id: context.user.id });

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

                const result = await ProfilesModel.findByIdAndUpdate({ _id: userResponse.profile_id }, options, { new: true });

                if (result) {
                    return 'Success';
                }
                return 'Something when wrong';
            } catch (err) {
                throw new Error('Error update role');
            }
        },
        updateImageProfile: async (_parent: unknown, { file }: FileTypes, context: ContextType): Promise<UpdateImageProfile> => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const userData: TypeUserGet = await UsersModel.findById({ _id: context.user.id }).populate('profile_id');
            const ProfileData = userData?.profile_id;

            // process upload file
            const upload = await processUpload(file, ProfileData);

            // save our file to the mongodb
            await ProfilesModel.findByIdAndUpdate({ _id: ProfileData?._id }, { image: upload.filename }, { new: true });
            return upload;
        }
    }
};

export default Resolvers;
