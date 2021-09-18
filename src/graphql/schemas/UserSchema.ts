import gql from 'graphql-tag';

const schema = gql`
    type Query {
        getUsers: [Users]
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

    enum SortDirection {
        ASC
        DESC
    }
`;

export default schema;
