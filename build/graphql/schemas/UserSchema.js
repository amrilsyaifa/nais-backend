"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const schema = (0, graphql_tag_1.default) `
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
exports.default = schema;
