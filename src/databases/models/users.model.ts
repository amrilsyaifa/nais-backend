import { prop as Property, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import { Roles } from './roles.model';
import { Profiles } from './profiles.model';


@ObjectType({ description: 'The Users Model' })
@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class Users {
    @Field(() => ID)
    id!: string;

    @Property({ ref: 'Roles', required: true })
    role_id!: Ref<Roles>[];

    @Property({ ref: 'Profiles', required: true })
    profile_id!: Ref<Profiles>;

    @Field()
    @Property({ type: String, required: true, unique: true })
    email!: string;

    @Field()
    @Property({ type: String, required: true, unique: true })
    username!: string;

    @Field()
    @Property({ type: String, required: true})
    password!: string;

    @Field()
    @Property({ type: Date, required: true })
    registered_at!: string;

    @Field()
    @Property({ type: Date, required: true })
    last_login!: Date;
    
}

export const UsersModel = getModelForClass(Users);
