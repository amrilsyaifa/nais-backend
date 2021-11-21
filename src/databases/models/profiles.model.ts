import { prop as Property, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType({ description: 'The Profiles Model' })
@modelOptions({ schemaOptions: { collection: 'profiles', timestamps: true } })
export class Profiles {
    @Field(() => ID)
    id!: string;

    @Field()
    @Property({ type: String, required: true })
    first_name!: string;

    @Field()
    @Property({ type: String })
    middle_name!: string;

    @Field()
    @Property({ type: String })
    last_name!: string;

    @Field({ nullable: true })
    @Property({ type: String, required: true, unique: true })
    phone_number!: string;

    @Field()
    @Property({ type: String, required: true, default: 'profile.jpg' })
    image!: string;

    @Field()
    @Property({ type: String })
    address!: string;

    @Field()
    @Property({ type: String })
    zip_code!: string;

    @Field()
    @Property({ type: String })
    place_of_birth!: string;

    @Field()
    @Property({ type: Date })
    birthday!: string;
}

export const ProfilesModel = getModelForClass(Profiles);
