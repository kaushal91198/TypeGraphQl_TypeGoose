import {
    getModelForClass,
    prop,
    pre,
    ReturnModelType,
    queryMethod,
    index,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import bcrypt from "bcrypt";
import { IsEmail, MaxLength, MinLength, Matches } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";


@pre<User>('save', async function () {
    //check that is being modified
    if (!this.isModified('password')) {
        return
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hashSync(this.password, salt)
    this.password = hash
})

@index({ email: 1 }, { unique: true }) // compound index
@ObjectType()
export class User {
    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop({ required: true })
    name: string

    @Field(() => String)
    @prop({ required: true })
    email: string

    @prop({ required: true })
    password: string

}

export const UserModel = getModelForClass<typeof User>(User);

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name: string;

    @IsEmail()
    @Field(() => String)
    email: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        message: 'Password must have Uppercase, Lowercase, special character,number and limit 8 must be required. a valid number'
    })
    @Field(() => String)
    password: string;
}

@InputType()
export class LoginInput {

    @Field(() => String)
    email: string;
    @Field(() => String)
    password: string;
}
