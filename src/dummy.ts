import { Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST_USER_KEY } from './auth/constants/auth.constants';
// import { Post } from './entities/post.entity';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  private posts: Post[] = [];
  private idCounter = 1;

  create(@Req() request): Post {
    console.log(request[REQUEST_USER_KEY])
    // const post: Post = {
    //   id: this.idCounter++,
    //   ...createPostDto,
    // };
    // this.posts.push(post);
    // return post;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const post = this.findOne(id);
    Object.assign(post, updatePostDto);
    return post;
  }

  remove(id: number): void {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    this.posts.splice(index, 1);
  }
}
