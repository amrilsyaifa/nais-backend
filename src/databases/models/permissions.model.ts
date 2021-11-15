import { prop as Property, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType({ description: 'The Permissions Model' })
@modelOptions({ schemaOptions: { collection: 'permissions', timestamps: true } })
export class Permissions {
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
}

export const PermissionsModel = getModelForClass(Permissions);
