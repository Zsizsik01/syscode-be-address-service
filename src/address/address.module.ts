import { Module } from '@nestjs/common';
import { AddressController } from './controllers';
import { AddressService } from './services';
import { BasicAuthGuard } from '../auth';

@Module({
  controllers: [AddressController],
  providers: [AddressService, BasicAuthGuard],
})
export class AddressModule {}
