"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const schema = (0, graphql_tag_1.default) `
    type Query {
        getRoles: [Roles]
        getRole(id: String!): Roles
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
        permissions: [RolesPermission]
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
exports.default = schema;
