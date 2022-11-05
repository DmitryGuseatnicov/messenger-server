import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsUUID()
  chat_id: string;
}
