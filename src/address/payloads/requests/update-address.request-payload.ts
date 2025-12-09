import { IsString } from 'class-validator';

export class UpdateAddressRequestPayload {
  @IsString()
  address!: string;
}
