import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CookieUtil } from '@/common/utils/cookie.util';

import { LoginRequestDto } from '../dto/requests/login-request.dto';

import { LoginService } from '../services/login.service';
import { GetMeService } from '../services/get-me.service';
import { ForgotPasswordService } from '../services/forgot-password.service';
import { ResetPasswordService } from '../services/reset-password.service';

import { ForgotPasswordDto } from '../dto/requests/forgot-password.dto';
import { ResetPasswordDto } from '../dto/requests/reset-password.dto';
import { CurrentUserDto } from '../dto/responses/current-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginService: LoginService,
        private readonly configService: ConfigService,
        private readonly getMeService: GetMeService,
        private readonly forgotPasswordService: ForgotPasswordService,
        private readonly resetPasswordService: ResetPasswordService,
    ) { }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Login',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: CurrentUserDto,
    })
    async login(
        @Body() loginDto: LoginRequestDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<CurrentUserDto> {
        const result = await this.loginService.execute(loginDto);

        CookieUtil.setAccessToken(response, result.accessToken, this.configService);

        return result.user;
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get current user',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: CurrentUserDto,
    })
    async me(
        @CurrentUser('sub') userId: string
    ): Promise<CurrentUserDto> {
        return this.getMeService.execute(userId);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Logout',
    })
    logout(@Res({ passthrough: true }) response: Response): { message: string } {
        CookieUtil.clearAccessToken(response, this.configService);

        return {
            message: 'Logged out successfully.',
        };
    }

    @Public()
    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Forgot password',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Password reset link sent to your email.',
    })
    async forgotPassword(
        @Body() forgotPasswordDto: ForgotPasswordDto,
    ): Promise<{ message: string }> {
        await this.forgotPasswordService.execute(forgotPasswordDto.email);

        return {
            message: 'Password reset link sent to your email.',
        };
    }

    @Public()
    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Reset password',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Password reset successfully.',
    })
    async resetPassword(
        @Body() resetPasswordDto: ResetPasswordDto,
    ): Promise<{ message: string }> {
        await this.resetPasswordService.execute(resetPasswordDto);

        return {
            message: 'Password reset successfully.',
        };
    }
}
