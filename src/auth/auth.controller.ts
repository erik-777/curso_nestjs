import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entities/auth.entity';
import { GetRawHeader, GetUser } from './decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())

  //testAuth(@Req() request: Express.Request) {

  testAuth(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @Req() request: Express.Request,
    @GetRawHeader('authorization') rawHeader: string[]
  ) {
    console.log(request);
    console.log(rawHeader);
    // const user = request.user;

    // console.log(user);

    return {
      ok: true,
      message: 'Private route',
      user,
      userEmail, rawHeader
    };


  }

  @Get('private2')
  @SetMetadata('isPublic', true)
  @SetMetadata('roles', ['admin', 'super-user'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user
    };
  }
}