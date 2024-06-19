import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

class User {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  age: number;
}

export default User;
