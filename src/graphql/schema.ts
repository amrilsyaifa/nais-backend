import gql from 'graphql-tag';

export const schema = gql`
    type Query {
        getUsers: [Users]
    }
    
    type Mutation {
        login(username: String!, password: String!): LoginResponse
    }

    type Users {
        id: ID!
        role_id: String
        profile_id: String
        email: String
        username: String
        password: String
        registered_at: String
        last_login: String
    }

    type LoginResponse {
        token: String
        user: Users
    }

    enum SortDirection {
        ASC
        DESC
    }
`;
