import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WebsiteModule } from './website/website.module';
import { DomainAddressModule } from './domain-address/domain-address.module';
import { IpAddressModule } from './ip-address/ip-address.module';

@Module({
  imports: [PrismaModule, WebsiteModule, DomainAddressModule, IpAddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
