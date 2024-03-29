import { Query, Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { CreateUserInput, LoginInput, User } from '../schema/user.schema'
import UserService from '../services/user.services'
import Context from '../types/context'
import { ApolloError } from "apollo-server";


@Resolver()
export default class UserResolver {

    constructor(private userService: UserService) {
        this.userService = new UserService()
    }

    @Mutation(() => User)
    createUser(@Arg('input') input: CreateUserInput) {
        return this.userService.createUser(input)
    }

    @Mutation(() => String) //Token
    login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
        return this.userService.login(input, context)
    }

    @Query(() => User)
    me(@Ctx() context: Context) {
        if (context.user) {
            return context.user
        }
        else {
            throw new ApolloError('User not found');
        }
    }
}