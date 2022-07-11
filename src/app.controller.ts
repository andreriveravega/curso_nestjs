import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  getHola(): string {
    return this.appService.getHola()
  }

  @Get('config')
  getConfig(): string {
   return this.appService.getConfig()
  }


}
