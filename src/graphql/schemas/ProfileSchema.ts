import gql from 'graphql-tag';

const schema = gql`
    scalar Upload

    type Query {
        getMyProfiles: User
        getProfiles: [Profile]
        getProfile(id: String!): Profile
    }

    type Mutation {
        updateMyProfiles(
            first_name: String
            middle_name: String
            last_name: String
            phone_number: String
            address: String
            zip_code: String
            place_of_birth: String
            birthday: String
        ): String!
        updateImageProfile(file: Upload!): File!
    }

    type User {
        email: String
        username: String
        registered_at: String
        last_login: String
        role_id: String
        profile_id: String
        role: Role
        profile: Profile
    }

    type Role {
        id: ID!
        title: String
        slug: String
        description: String
        active: Boolean
        permissions: [Permission]
    }

    type Profile {
        id: ID!
        first_name: String
        middle_name: String
        last_name: String
        phone_number: String
        address: String
        zip_code: String
        place_of_birth: String
        birthday: String
    }

    type Permission {
        title: String
        slug: String
        description: String
        active: Boolean
    }
    type File {
        filename: String!
        mimetype: String!
        path: String!
    }
`;

export default schema;
