import { prop as Property, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import { Permissions } from './permissions.model';

@ObjectType({ description: 'The Roles Model' })
@modelOptions({ schemaOptions: { collection: 'roles', timestamps: true } })
export class Roles {
    @Field(() => ID)
    id!: string;

    @Field()
    @Property({ type: String, required: true })
    title!: string;

    @Field()
    @Property({ type: String, required: true, unique: true })
    slug!: string;

    @Field({ nullable: true })
    @Property({ type: String, required: false })
    description!: string;

    @Field()
    @Property({ type: Boolean, required: true })
    active!: boolean;

    @Property({ ref: 'Permissions', unique: true })
    permissions!: Ref<Permissions>[];
}

export const RolesModel = getModelForClass(Roles);
