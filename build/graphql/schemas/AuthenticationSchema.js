"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const schema = (0, graphql_tag_1.default) `    
    type Mutation {
        login(username: String!, password: String!): LoginResponse
        register(email: String!, username: String!, password: String!, first_name: String!, middle_name: String, last_name: String, phone_number: String!): String!
    }

    type LoginResponse {
        token: String
        user: Users
    }
`;
exports.default = schema;
