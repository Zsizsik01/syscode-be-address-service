import { IsString, IsUUID } from 'class-validator';

export class CreateAddressRequestPayload {
  @IsUUID()
  id!: string;

  @IsString()
  address!: string;
}
