import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PasswordChangedEvent } from './events/password-changed.event';
import { UserDocument, User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(res: Response, userId: any) {
    const token = this.jwtService.sign({ userId });

    res.cookie('jwt', token, {
      httpOnly: false,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === 'prod',
    });
    return token;
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.validateUser(loginDto);

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      return null;
    }
  }



  async signup(signupDto: SignupDto):Promise<UserDocument | Error> {
    return await this.userService.signUp(signupDto);
  }

  async changePassword(changePasswordDto: ChangePasswordDto, jwt: string) {
    const { userId } = this.jwtService.decode(jwt) as { userId: any };
    const response = await this.userService.changePassword(
      changePasswordDto,
      userId,
    );
    console.log(response.name);
    if (response.name !== 'Error') {
      const user = await this.userService.findById(userId);
      console.log('usr', user);
      // Changing password Events
      const passwordChangedEvent = new PasswordChangedEvent();
      passwordChangedEvent.name = user.name;
      passwordChangedEvent.email = user.email;
      passwordChangedEvent.phone = user.phone;
      passwordChangedEvent.description =
        'Your password has been changed successfully';
    }
    return response;
  }

  async updateUserActiveStatus(id: string, active: boolean) {
    return this.userService.updateUserActiveStatus(id, active);
  }

  async findUser(email: string) {
    return await this.userService.findOne(email);
  }

  async findOne(id: string) {
    return await this.userService.findById(id);
  }
  async getAllCustomers() {
    return await this.userService.getAllCustomers();
  }
  async findAll() {
    return await this.userService.findAll();
  }
}
