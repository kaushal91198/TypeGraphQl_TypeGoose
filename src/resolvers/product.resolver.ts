import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateProductInput, Product } from "../schema/product.schema";
import ProductService from "../services/product.services";
import Context from "../types/context";

@Resolver()
export default class ProductResolver {
    constructor(private productService: ProductService) {
        this.productService = new ProductService()
    }

    @Authorized()
    @Mutation(() => Product)
    createProduct(@Arg('input') input: CreateProductInput, @Ctx() context: Context) {
        const user = context.user!
        return this.productService.createProduct({ ...input, user: user?._id })
    }
}