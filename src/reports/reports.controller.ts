import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportsService } from "./reports.service";
import { AuthGuard } from "../guards/auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { Serialize } from "../interceptors/serialize.interceptor";
import { ReportDto } from "./dtos/report.dto";
import { User } from "../users/user.entity";
import { CurrentUser } from "../users/decorators/current-user.decorator";

@Controller("reports")
@ApiTags("Reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {
  }

  @Get()
  @Serialize(ReportDto)
  findAll() {
    return this.reportsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
