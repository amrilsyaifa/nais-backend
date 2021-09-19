import gql from 'graphql-tag';

const schema = gql`
    type Query {
        getPermissions: [Permissions]
        getPermission(id: String!): Permissions
    }

    type Mutation {
        addPermission(id: String!,title: String!, slug: String!, description: String, active: Boolean! ): PermissionMutation
        updatePermission(id: String!,title: String, slug: String, description: String, active: Boolean ): String
        deletePermission(id: String!): String
    }

    type Permissions {
        id: ID!
        title: String
        slug: String
        description: String
        active: Boolean
    }
    
    type PermissionMutation {
        id: String
        title: String
        slug: String
        description: String
        active: Boolean
    }
`;

export default schema;
