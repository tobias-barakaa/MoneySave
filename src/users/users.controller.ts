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
    UseGuards,
    SetMetadata,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { CreateUserDto } from './dtos/create-user.dto';
  import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersSevice } from './providers/users.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
  
  @ApiTags('Users')
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersSevice) {}
  
    @Post()
    // @SetMetadata('authType', 'none')
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 409, description: 'User already exists' })
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto, 'createUserDto..................................');
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