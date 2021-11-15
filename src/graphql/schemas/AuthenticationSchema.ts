import gql from 'graphql-tag';

const schema = gql`
    type Mutation {
        login(username: String!, password: String!): AuthLoginResponse
        register(
            email: String!
            username: String!
            password: String!
            first_name: String!
            middle_name: String
            last_name: String
            phone_number: String!
        ): String!
    }

    type AuthLoginResponse {
        token: String
        user: AuthLoginUser
    }

    type AuthLoginUser {
        _id: String
        role_id: [AuthLoginRoles]
        profile_id: [AuthLoginProfile]
        email: String
        username: String
        registered_at: String
        last_login: String
    }

    type AuthLoginRoles {
        _id: String
        title: String
        slug: String
        description: String
        active: Boolean
        permissions: [RolesPermission]
    }

    type AuthLoginProfile {
        _id: String
        first_name: String
        middle_name: String
        last_name: String
        phone_number: String
        address: String
        zip_code: String
        place_of_birth: String
        birthday: String
    }
`;

export default schema;
