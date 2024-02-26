import { Module } from '@nestjs/common';

import { AwsGateway } from 'src/shared/gateways/aws.gateway';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, AwsGateway],
})
export class ProductsModule {}
