import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { postStatus } from "../enums/postStatus.enum";
import { postType } from "../enums/postType.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    /**
     * The title of the post
     */
    @ApiProperty({
        description: 'Title of the post',
        type: String,
        example: 'My First Post',
        required: true,
        minLength: 3,
        maxLength: 256

    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(256)
    title: string;

    @ApiProperty({
        enum: postType,
        description: 'Type of the post',
        example: postType.PAGE,
        required: true,
        enumName: 'postType',
    })
    @IsEnum(postType)
    @IsNotEmpty()
    postType: postType;

    @ApiProperty({
        description: 'Slug of the post',
        type: String,
        example: 'my-first-post',
        required: true,
        minLength: 3,
        maxLength: 96
    })
    @IsString()
    slug: string;

    @ApiProperty({
        enum: postStatus,
        description: 'Status of the post',
        example: postStatus.DRAFT,
        required: true,
        enumName: 'postStatus',
    })
    status: postStatus;
    content?: string;
    schema: string;
    featuredImage: string;
    publishOn: Date;
    tags?: string[];
    metaOptions: [{
        key: string;
        value: string;
    }]



}