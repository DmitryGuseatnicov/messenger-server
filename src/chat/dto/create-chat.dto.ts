import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  user_id: string;
}
