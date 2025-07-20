import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateDermantinImageDto {
    @Field()
    dermantin_id: number
    @Field()
    image_url: string
    @Field()
    is_main?: boolean
}
