import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseJsonPipe
  implements PipeTransform<string, Record<string, any>>
{
  transform(value: string, metadata: ArgumentMetadata): Record<string, any> {
    const propertyName = metadata.data;
    try {
      console.log(value);
      return JSON.parse(value);
    } catch (e) {
      throw new BadRequestException(`${propertyName} contains invalid JSON `);
    }
  }
}
