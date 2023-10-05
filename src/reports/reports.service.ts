import { Injectable } from "@nestjs/common";
import { CreateReportDto } from "./dtos/create-report.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Report } from "./report.entity";
import { User } from "../users/user.entity";

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repository: Repository<Report>
  ) {
  }

  findAll() {
    return this.repository.find();
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repository.create(reportDto);
    report.user = user;
    return this.repository.save(report);
  }
}
