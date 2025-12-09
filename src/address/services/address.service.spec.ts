import { NotFoundException } from '@nestjs/common';
import { AddressService } from './address.service';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(() => {
    service = new AddressService();
  });

  describe('getAddress', () => {
    it('should return an address when it exists', () => {
      service['addresses'].set('1', { id: '1', address: 'Test street 5' });

      const result = service.getAddress('1');

      expect(result).toEqual({ id: '1', address: 'Test street 5' });
    });

    it('should throw NotFoundException if address does not exist', () => {
      expect(() => service.getAddress('99')).toThrow(NotFoundException);
    });
  });

  describe('createAddress', () => {
    it('should create and return the created address', () => {
      const result = service.createAddress('1', 'Budapest');

      expect(result).toEqual({ id: '1', address: 'Budapest' });
      expect(service['addresses'].size).toBe(1);
    });
  });

  describe('updateAddress', () => {
    it('should update an existing address', () => {
      service['addresses'].set('1', { id: '1', address: 'Old address' });

      const result = service.updateAddress('1', 'New address');

      expect(result).toEqual({ id: '1', address: 'New address' });
    });

    it('should throw NotFoundException when address does not exist', () => {
      expect(() => service.updateAddress('99', 'Anything')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteAddress', () => {
    it('should delete an existing address', () => {
      service['addresses'].set('1', { id: '1', address: 'Test address' });

      service.deleteAddress('1');

      expect(service['addresses'].has('1')).toBe(false);
    });

    it('should not throw error when deleting a non-existing address', () => {
      expect(() => service.deleteAddress('123')).not.toThrow();
    });
  });
});
