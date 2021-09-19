import gql from 'graphql-tag';

const schema = gql`
    type Query {
        getRole: [Roles]
        getRoleById(id: String!): Roles
    }

    type Mutation {
        addRole(id: String!,title: String!, slug: String!, description: String, active: Boolean! ): RoleMutation
        updateRole(id: String!,title: String, slug: String, description: String, active: Boolean ): String
        deleteRole(id: String!): String
    }

    type Roles {
        id: ID!
        title: String
        slug: String
        description: String
        active: Boolean
        roles: [RolesPermission]
    }

    type RolesPermission {
        title: String
        slug: String
        description: String
        active: Boolean
    }
    
    type RoleMutation {
        id: String
        title: String
        slug: String
        description: String
        active: Boolean
    }
`;

export default schema;