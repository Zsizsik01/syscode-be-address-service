import { AddressService } from './address.service';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(() => {
    service = new AddressService();
  });

  it('should generate an address', () => {
    const result = service.getAddress();

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('address');
  });
});
