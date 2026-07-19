export const UPLOAD_MESSAGES = {
    IMAGE_UPLOADED: 'Image uploaded successfully.',
    IMAGE_DELETED: 'Image deleted successfully.',
    IMAGE_REPLACED: 'Image replaced successfully.',

    FILE_REQUIRED: 'Please select an image to upload.',
    INVALID_FILE_TYPE:
        'Only JPG, JPEG, PNG, WEBP, AVIF, and GIF images are allowed.',
    FILE_TOO_LARGE: 'Image size must not exceed 5 MB.',
} as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/gif',
] as const;

export const IMAGE_EXTENSIONS = [
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
    '.avif',
    '.gif',
] as const;
