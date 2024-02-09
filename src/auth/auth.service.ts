import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(SignUpDto: SignUpDto): Promise<{ token: string }> {
    const { firstname, lastname, username, password } = SignUpDto;
    const existingUser = await this.userModel.findOne({ username });

    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      firstname,
      lastname,
      username,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(LogInDto: LoginDto): Promise<{ user: User; token: string }> {
    const { username, password } = LogInDto;
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { user, token };
  }

  async findAll(): Promise<User[]> {
    const user = await this.userModel.find();
    return user;
  }

  async deleteById(id: String): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
