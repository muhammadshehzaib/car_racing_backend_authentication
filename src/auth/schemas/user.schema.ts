import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({ description: 'The first name of the user' })
  @Prop()
  firstname: string;

  @ApiProperty({ description: 'The last name of the user' })
  @Prop()
  lastname: string;

  @ApiProperty({ description: 'The username of the user' })
  @Prop()
  username: string;

  @ApiProperty({ description: 'The password of the user' })
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
