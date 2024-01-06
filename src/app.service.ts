import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {
    console.log(process.env.MONGO_URI);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
