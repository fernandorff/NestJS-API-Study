import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("App")
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  @ApiOperation({ summary: "Hello World!" })
  getHello(): string {
    return this.appService.getHello();
  }
}
