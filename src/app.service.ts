import { Injectable } from '@nestjs/common';
import User from './types/user.dto';

@Injectable()
export class AppService {
  uploadFile(file: Express.Multer.File, user: User) {
    console.log(file.originalname);
    console.log(user);
    return user;
  }
}
