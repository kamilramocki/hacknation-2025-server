import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateWebsiteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  domainAddresses?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ipAddresses?: string[];
}

