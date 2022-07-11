import { Get, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) { }

  getHola(){
    return 'hola mundo NESTJS'
  }
  getConfig(): string {
    return this.configService.get('APP_NAME');
  }


}
