import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'username', example: 'abc@example.com' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: 'Password', example: '<PASSWORD>' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
