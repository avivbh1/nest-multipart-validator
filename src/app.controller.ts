import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import UploadedFileDTO from './types/upload-file.dto';
// import { ParseJsonPipe } from './pipes/transform-string-object.pipe';
import User from './types/user.dto';
import { BodyStringObject } from './decorators/body-string-object/transform-string-object.decorator';
// import User from './types/user.dto';
// import { BodyStringObject } from './decorators/body-string-object/transform-string-object.decorator';

@Controller()
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload-file/validated-form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes()
  uploadFileValidated(
    @UploadedFile() file: Express.Multer.File,
    @BodyStringObject<User>({ fieldName: 'user', typeClass: User }) user: User,
  ): User {
    return this.appService.uploadFile(file, user);
  }

  // @Post('upload-file/invalidated-form-data')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFileInvalidated(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body('user')
  //   user: User,
  // ): void {
  //   console.log(user);
  //   this.appService.uploadFile(file, user);
  // }
}
