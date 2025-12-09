import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from '../services';
import { BasicAuthGuard } from '../../auth';
import { AddressResponsePayload } from '../payloads/responses';
import {
  CreateAddressRequestPayload,
  UpdateAddressRequestPayload,
} from '../payloads/requests';

@Controller('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @UseGuards(BasicAuthGuard)
  @Get(':id')
  public getAddress(@Param('id') id: string): AddressResponsePayload {
    return this.service.getAddress(id);
  }

  @UseGuards(BasicAuthGuard)
  @Post()
  public createAddress(
    @Body() payload: CreateAddressRequestPayload,
  ): AddressResponsePayload {
    return this.service.createAddress(payload.id, payload.address);
  }

  @UseGuards(BasicAuthGuard)
  @Put(':id')
  public updateAddress(
    @Param('id') id: string,
    @Body() payload: UpdateAddressRequestPayload,
  ): AddressResponsePayload {
    return this.service.updateAddress(id, payload.address);
  }

  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  public deleteAddress(@Param('id') id: string): void {
    this.service.deleteAddress(id);
  }
}
