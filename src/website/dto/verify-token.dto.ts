import { IsString, IsNotEmpty, IsHexadecimal, Length } from 'class-validator';

export class VerifyTokenDto {
  @IsString({ message: 'Token must be a string' })
  @IsNotEmpty({ message: 'Token is required' })
  @IsHexadecimal({ message: 'Token must be a valid hexadecimal string' })
  @Length(64, 64, { message: 'Token must be exactly 64 characters (SHA256 hash)' })
  token: string;
}

