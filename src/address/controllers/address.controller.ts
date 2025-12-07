import { Controller, Get, UseGuards } from '@nestjs/common';
import { AddressService } from '../services';
import { BasicAuthGuard } from '../../auth';
import { AddressResponsePayload } from '../payloads/responses';

@Controller('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @UseGuards(BasicAuthGuard)
  @Get()
  public getAddress(): AddressResponsePayload {
    return this.service.getAddress();
  }
}
