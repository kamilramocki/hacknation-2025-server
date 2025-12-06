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
import { WebsiteService } from './website.service';
import { CreateWebsiteDto, UpdateWebsiteDto, VerifyTokenDto } from './dto';

@Controller('websites')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post()
  create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.websiteService.create(createWebsiteDto);
  }

  @Get()
  findAll() {
    return this.websiteService.findAll();
  }

  @Get(':id/current-token')
  getCurrentToken(@Param('id', ParseUUIDPipe) id: string) {
    return this.websiteService.getCurrentToken(id);
  }

  @Post(':id/verify-token')
  verifyToken(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() verifyTokenDto: VerifyTokenDto,
  ) {
    return this.websiteService.verifyToken(id, verifyTokenDto.token);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.websiteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWebsiteDto: UpdateWebsiteDto,
  ) {
    return this.websiteService.update(id, updateWebsiteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.websiteService.remove(id);
  }
}

