import { ApolloError } from "apollo-server";
import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import Context from "../types/context";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";

class UserService {
    async createUser(input: CreateUserInput) {
        //call user model  to create the a user
        return UserModel.create(input)
    }
    async login(input: LoginInput, context: Context) {
        const e = 'Invalid email or password'
        //Get Our User by Email
        const findUserEmail = await UserModel.findOne({
            email: input.email
        }).lean()
        if (!findUserEmail) {
            throw new ApolloError(e)
        }
        //validate the password
        const passwordIsValid = await bcrypt.compare(input.password, findUserEmail.password);
        if (!passwordIsValid) {
            throw new ApolloError(e);
        }

        //sign a jwt 
        const token = signJwt(findUserEmail)
        context.res.cookie('token',token)
        //return the jwt
        return token
    }
}


export default UserService
