import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "The email address of the user",
    example: "user@example.com"
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The password of the user",
    example: "password123"
  })
  password!: string;
}