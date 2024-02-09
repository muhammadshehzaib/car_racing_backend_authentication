import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: 'first name', example: 'user name' })
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @ApiProperty({ description: 'last name', example: 'user name' })
  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @ApiProperty({ description: 'username', example: 'user name' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'Password', example: '<PASSWORD>' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
