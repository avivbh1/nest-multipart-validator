import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';

interface BodyStringObjectDecoratorParams<T> {
  fieldName: string;
  typeClass: ClassConstructor<T>;
}

/**
 * Usage: Transforming multipart/form-data body objects (which are accepts as strings)
 * to their's class entities and validate them
 * Why: sometimes we'll want to upload objects with our files (files requires multipart/form-data)
 * to the same endpoint with json objects
 */
export const BodyStringObject = createParamDecorator(
  async <T extends NonNullable<unknown>>(
    { fieldName, typeClass }: BodyStringObjectDecoratorParams<T>,
    ctx: ExecutionContext,
  ): Promise<T> => {
    const request = ctx.switchToHttp().getRequest();

    console.log(1);
    console.log(typeClass.name);
    // Transform plain object to class instance
    const instance: T = plainToInstance(typeClass, request.body[fieldName]);

    console.log(instance);
    // Validate the class instance
    const validationErrors = await validate(instance);

    console.log(1);
    if (validationErrors.length > 0) {
      const errors = validationErrors.map((error) => {
        return Object.values(error.constraints).join(', ');
      });
      throw new BadRequestException(errors);
    }

    return instance;
  },
);
