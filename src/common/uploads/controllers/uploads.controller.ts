import {
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { UploadApiResponse } from 'cloudinary';

import { UserRole } from '@/lib/prisma/client';

import { Roles } from '@/common/decorators/roles.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';

import {
    CloudinaryFolder,
    type CloudinaryFolderType,
} from '@/common/cloudinary/cloudinary.types';

import { UploadResponseDto } from '../dto/responses/upload-response.dto';
import { UploadImageService } from '../services/upload-image.service';
import { DeleteImageService } from '../services/delete-image.service';
import { ReplaceImageService } from '../services/replace-image.service';

@ApiTags('Uploads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
@Controller('uploads')
export class UploadsController {
    constructor(
        private readonly uploadImageService: UploadImageService,
        private readonly deleteImageService: DeleteImageService,
        private readonly replaceImageService: ReplaceImageService,
    ) {}

    @Post('image')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({
        summary: 'Upload image',
    })
    @ApiConsumes('multipart/form-data')
    @ApiQuery({
        name: 'folder',
        required: false,
        enum: Object.values(CloudinaryFolder),
    })
    @ApiBody({
        schema: {
            type: 'object',
            required: ['file'],
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: UploadResponseDto,
    })
    async uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @Query('folder')
        folder: CloudinaryFolderType = CloudinaryFolder.DOCUMENTS,
    ): Promise<UploadResponseDto> {
        return this.uploadImageService.execute(
            file.path,
            folder,
        );
    }

    @Put(':publicId')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({
        summary: 'Replace image',
    })
    @ApiConsumes('multipart/form-data')
    @ApiParam({
        name: 'publicId',
    })
    @ApiQuery({
        name: 'folder',
        required: false,
        enum: Object.values(CloudinaryFolder),
    })
    @ApiBody({
        schema: {
            type: 'object',
            required: ['file'],
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async replaceImage(
        @Param('publicId') publicId: string,
        @UploadedFile() file: Express.Multer.File,
        @Query('folder')
        folder: CloudinaryFolderType = CloudinaryFolder.DOCUMENTS,
    ): Promise<UploadApiResponse> {
        return this.replaceImageService.execute(
            publicId,
            file.path,
            folder,
        );
    }

    @Delete(':publicId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Delete image',
    })
    @ApiParam({
        name: 'publicId',
    })
    async deleteImage(
        @Param('publicId') publicId: string,
    ): Promise<{ message: string }> {
        return this.deleteImageService.execute(
            publicId,
        );
    }
}