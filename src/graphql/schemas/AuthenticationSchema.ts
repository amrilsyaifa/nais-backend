import gql from 'graphql-tag';

 const schema = gql`    
    type Mutation {
        login(username: String!, password: String!): LoginResponse
        register(email: String!, username: String!, password: String!, first_name: String!, middle_name: String, last_name: String, phone_number: String!): String!
    }

    type LoginResponse {
        token: String
        user: Users
    }
`;

export default schema