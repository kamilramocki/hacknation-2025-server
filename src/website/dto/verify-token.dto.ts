import { IsString, IsNotEmpty, IsHexadecimal, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyTokenDto {
  @ApiProperty({
    description: 'The token from the QR code to verify',
    example: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
    minLength: 64,
    maxLength: 64,
  })
  @IsString({ message: 'Token must be a string' })
  @IsNotEmpty({ message: 'Token is required' })
  @IsHexadecimal({ message: 'Token must be a valid hexadecimal string' })
  @Length(64, 64, { message: 'Token must be exactly 64 characters (SHA256 hash)' })
  token: string;
}

