import { Body } from "@nestjs/common";
import { Request } from "@nestjs/common";
import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users/auth')
export class UsersAuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('signup')
    async signup(@Body() CreateUserDto: CreateUserDto) {
        return this.authService.signup(CreateUserDto)
    }
}