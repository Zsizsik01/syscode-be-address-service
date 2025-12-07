import { IsString, IsUUID } from 'class-validator';

export class AddressResponsePayload {
  @IsUUID()
  id!: string;

  @IsString()
  address!: string;
}
