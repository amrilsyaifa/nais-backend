"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const schema = (0, graphql_tag_1.default) `
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
exports.default = schema;
