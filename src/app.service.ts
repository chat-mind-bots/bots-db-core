import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {
    console.log(JSON.stringify(process.env));
  }
  getHello(): string {
    return 'Hello World!';
  }
}
