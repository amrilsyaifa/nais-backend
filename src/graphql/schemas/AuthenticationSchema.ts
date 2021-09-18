import gql from 'graphql-tag';

 const schema = gql`    
    type Mutation {
        login(username: String!, password: String!): LoginResponse
    }

    type LoginResponse {
        token: String
        user: Users
    }
`;

export default schema