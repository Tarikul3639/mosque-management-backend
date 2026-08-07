import {
  Controller,
  Delete,
  Get,
  Body,
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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadApiResponse } from 'cloudinary';

import { UserRole } from '../../../lib/prisma/client';

import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

import {
  CloudinaryFolder,
  type CloudinaryFolderType,
} from '../../../common/cloudinary/cloudinary.types';

import { UploadResponseDto } from '../dto/responses/upload-response.dto';
import { FileResponseDto } from '../dto/responses/file-response.dto';
import { CreateFileDto } from '../dto/requests/create-file.dto';
import { UploadSignatureResponseDto } from '../dto/responses/upload-signature-response.dto';

import { CreateUploadSignatureService } from '../services/create-upload-signature.service';
import { CreateFileService } from '../services/create-file.service';
import { UploadImageService } from '../services/upload-image.service';
import { ReplaceImageService } from '../services/replace-image.service';
import { DeleteImageService } from '../services/delete-image.service';

@ApiTags('Uploads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly createUploadSignatureService: CreateUploadSignatureService,
    private readonly createFileService: CreateFileService,
    private readonly uploadImageService: UploadImageService,
    private readonly replaceImageService: ReplaceImageService,
    private readonly deleteImageService: DeleteImageService,
  ) {}

  @Get('signature')
  @ApiOperation({
    summary: 'Generate Cloudinary upload signature',
    description:
      'Returns a signed payload for direct browser-to-Cloudinary uploads.',
  })
  @ApiQuery({
    name: 'folder',
    required: true,
    enum: Object.values(CloudinaryFolder),
  })
  @ApiOkResponse({
    type: UploadSignatureResponseDto,
  })
  getSignature(
    @Query('folder') folder: CloudinaryFolderType,
  ): UploadSignatureResponseDto {
    return this.createUploadSignatureService.execute(folder);
  }

  @Post('file')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create file record',
    description:
      'Creates a database record for a file that has already been uploaded to Cloudinary.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FileResponseDto,
  })
  async createFile(@Body() dto: CreateFileDto): Promise<FileResponseDto> {
    return this.createFileService.execute(dto);
  }

  @Post('image')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Upload image',
    description:
      'Uploads an image through the backend. Use this endpoint for server-side uploads.',
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
    return this.uploadImageService.execute(file.path, folder);
  }

  @Put(':publicId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Replace image',
    description: 'Replaces an existing Cloudinary image using the backend.',
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
    return this.replaceImageService.execute(publicId, file.path, folder);
  }

  @Delete(':publicId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete image',
  })
  @ApiParam({
    name: 'publicId',
  })
  @ApiOkResponse({
    schema: {
      example: {
        message: 'Image deleted successfully.',
      },
    },
  })
  async deleteImage(
    @Param('publicId') publicId: string,
  ): Promise<{ message: string }> {
    return this.deleteImageService.execute(publicId);
  }
}
