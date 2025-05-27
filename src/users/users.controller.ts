import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { CreateUserDto } from './dtos/create-user.dto';
  import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersSevice } from './providers/users.service';
  
  @ApiTags('Users')
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersSevice) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 409, description: 'User already exists' })
    async createUser(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUser(createUserDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    async findAllUsers() {
      return this.usersService.findAllUsers();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findUserById(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findUserById(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async updateUser(
      @Param('id', ParseIntPipe) id: number,
      @Body() patchUserDto: PatchUserDto,
    ) {
      return this.usersService.updateUser(id, patchUserDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 204, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.deleteUser(id);
    }
  }
















// import { Body, Controller, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
// import { CreateUserDto } from './dtos/create-user.dto';
// import { GetUsersParamDto } from './dtos/get-users-param.dto';
// import { PatchUserDto } from './dtos/patch-user.dto';
// import { UsersSevice } from './providers/users.service';
// import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


// @Controller('users')
// @ApiTags('users')
// export class UsersController {
//     constructor( /**
//         * inject service
//         */
//        private readonly usersService: UsersSevice) {
       
//     }

//     @Get('/:id')
//     @ApiOperation({
//         summary: 'Fetches a list of users',
//     })
//     @ApiResponse({
//         status: 200,
//         description: 'Returns a list of users',
//         type: GetUsersParamDto,
//         isArray: true

//     })
//     @ApiQuery({
//         name: 'limit',
//         required: false,
//         description: 'Limit the number of users returned',
//         type: Number,
//         example: 10
//     })
//     public getUsers(@Param() getUsersParamDto: GetUsersParamDto) {
//         console.log(getUsersParamDto)
//         return this.usersService.createUser(getUsersParamDto);
//     }

//     @Post()
//     public createUsers(@Body() createUserDto: CreateUserDto) {
//         console.log(createUserDto instanceof CreateUserDto); 

//         return 'You sent a post request to users endpoint';
//     }

//     @Patch()
//     public patchUser(@Body() patchUserDto: PatchUserDto) {
//         return patchUserDto;
//     }
// }
