import { Injectable, NotFoundException } from '@nestjs/common';
import { Address } from '../interfaces';
import { CreateAddressRequestPayload } from '../payloads/requests';

@Injectable()
export class AddressService {
  private addresses = new Map<string, Address>();

  public getAddress(id: string): Address {
    const address = this.addresses.get(id);

    if (address === undefined) {
      throw new NotFoundException(`The ${id} user is not found!`);
    }

    return address;
  }

  public createAddress(id: string, address: string): Address {
    this.addresses.set(id, { id, address });

    return this.getAddress(id);
  }

  public updateAddress(id: string, address: string): Address {
    const selectedAddress = this.addresses.get(id);

    if (selectedAddress === undefined) {
      throw new NotFoundException(`The ${id} user is not found!`);
    }

    selectedAddress.address = address;

    return this.getAddress(id);
  }

  public deleteAddress(id: string): void {
    this.addresses.delete(id);
  }
}
