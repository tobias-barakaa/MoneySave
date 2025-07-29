import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })

    @IsString()
    @IsOptional()
    @MinLength(2)
    lastName: string;



  @ApiProperty({
    description: 'google id',
    example: 'SecurePassword123!',
  })
  @IsString()
  googleId?: string;


  @ApiProperty({
    description: 'User password',
    example: 'SecurePassword123!',
    minLength: 6,
  })

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

}