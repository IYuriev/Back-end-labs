import { HealthcheckService } from './healthcheck.service';
import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}
  @Get()
  getHealth() {
    return this.healthcheckService.getHealth();
  }
}
