import gql from 'graphql-tag';

const schema = gql`
    type Query {
        getRoles: [Roles]
        getRole(id: String!): Roles
    }

    type Mutation {
        addRole(title: String!, slug: String!, description: String, active: Boolean!, permissions: [String]): RoleMutation
        updateRole(id: String!, title: String, slug: String, description: String, active: Boolean, permissions: [String]): String
        deleteRole(id: String!): String
    }

    type Roles {
        id: ID!
        title: String
        slug: String
        description: String
        active: Boolean
        permissions: [RolesPermission]
    }

    type RolesPermission {
        title: String
        slug: String
        description: String
        active: Boolean
    }

    type RoleMutation {
        title: String
        slug: String
        description: String
        active: Boolean
        permissions: [String]
    }
`;

export default schema;
