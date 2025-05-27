import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';


@Controller('posts')
@ApiTags('posts')
export class PostsController {
    constructor(
        /* inject service */
        private readonly postsService: PostsService
    ) {}


    @Get() 
    public getPosts(@Param('userId') userId: string) {}

    @Post()
    public createPost(@Body() createPostDto: CreatePostDto) {}
    

}
