import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  getHealth() {
    return {
      status: HttpStatus.OK,
      date: new Date().toISOString(),
    };
  }
}
