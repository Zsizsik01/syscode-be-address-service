import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Address } from '../interfaces';

@Injectable()
export class AddressService {
  public getAddress(): Address {
    return {
      id: randomUUID(),
      address: `Random Street ${Math.floor(Math.random() * 1000)}`,
    };
  }
}
