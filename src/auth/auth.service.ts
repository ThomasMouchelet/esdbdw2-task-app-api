import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  signin(signinDto: SigninDto) {
    return "I'm signed in";
  }

  async signup(signupDto: SignupDto) {
    const password = await bcrypt.hash(signupDto.password, 10);
    signupDto.password = password;

    return this.userService.create(signupDto);
  }
}
