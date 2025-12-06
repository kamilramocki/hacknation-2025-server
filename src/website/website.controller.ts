import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { WebsiteService } from './website.service';
import { 
  CreateWebsiteDto, 
  UpdateWebsiteDto, 
  VerifyTokenDto,
  WebsiteResponseDto,
  TokenResponseDto,
  VerifyTokenResponseDto,
} from './dto';

@ApiTags('websites')
@Controller('websites')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new website', description: 'Create a website with optional domain and IP addresses' })
  @ApiResponse({ status: 201, description: 'Website created successfully', type: WebsiteResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.websiteService.create(createWebsiteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all websites', description: 'Retrieve all websites with their domain and IP addresses' })
  @ApiResponse({ status: 200, description: 'List of websites', type: [WebsiteResponseDto] })
  findAll() {
    return this.websiteService.findAll();
  }

  @Get(':id/current-token')
  @ApiOperation({ 
    summary: 'Generate QR token', 
    description: 'Generate a time-based token for QR code verification. Token is valid for 2 minutes.' 
  })
  @ApiParam({ name: 'id', description: 'Website UUID' })
  @ApiResponse({ status: 200, description: 'Token generated successfully', type: TokenResponseDto })
  @ApiResponse({ status: 404, description: 'Website not found' })
  getCurrentToken(@Param('id', ParseUUIDPipe) id: string) {
    return this.websiteService.getCurrentToken(id);
  }

  @Post(':id/verify-token')
  @ApiOperation({ 
    summary: 'Verify QR token', 
    description: 'Verify a scanned QR code token to check if the website is legitimate' 
  })
  @ApiParam({ name: 'id', description: 'Website UUID' })
  @ApiResponse({ status: 200, description: 'Token verification result', type: VerifyTokenResponseDto })
  @ApiResponse({ status: 404, description: 'Website not found' })
  verifyToken(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() verifyTokenDto: VerifyTokenDto,
  ) {
    return this.websiteService.verifyToken(id, verifyTokenDto.token);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get website by ID', description: 'Retrieve a website with its domain and IP addresses' })
  @ApiParam({ name: 'id', description: 'Website UUID' })
  @ApiResponse({ status: 200, description: 'Website found', type: WebsiteResponseDto })
  @ApiResponse({ status: 404, description: 'Website not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.websiteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update website', description: 'Update website details. Providing domain/IP arrays will replace existing ones.' })
  @ApiParam({ name: 'id', description: 'Website UUID' })
  @ApiResponse({ status: 200, description: 'Website updated successfully', type: WebsiteResponseDto })
  @ApiResponse({ status: 404, description: 'Website not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWebsiteDto: UpdateWebsiteDto,
  ) {
    return this.websiteService.update(id, updateWebsiteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete website', description: 'Delete a website and all its domain/IP addresses (cascade)' })
  @ApiParam({ name: 'id', description: 'Website UUID' })
  @ApiResponse({ status: 200, description: 'Website deleted successfully', type: WebsiteResponseDto })
  @ApiResponse({ status: 404, description: 'Website not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.websiteService.remove(id);
  }
}

