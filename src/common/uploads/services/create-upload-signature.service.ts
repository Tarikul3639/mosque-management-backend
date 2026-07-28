// create-upload-signature.service.ts

import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";

import { CloudinaryFolderType } from "@/common/cloudinary/cloudinary.types";
import { UploadSignatureResponseDto } from "../dto/responses/upload-signature-response.dto";

@Injectable()
export class CreateUploadSignatureService {
    execute(
        folder: CloudinaryFolderType,
    ): UploadSignatureResponseDto {
        const timestamp = Math.round(Date.now() / 1000);

        const signature = cloudinary.utils.api_sign_request(
            {
                folder,
                timestamp,
            },
            process.env.CLOUDINARY_API_SECRET!,
        );

        return {
            timestamp,
            signature,
            folder,
            apiKey: process.env.CLOUDINARY_API_KEY!,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
        };
    }
}