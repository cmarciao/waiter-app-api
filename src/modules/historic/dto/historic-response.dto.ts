/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OrderState } from '@prisma/client';
import { OrderResponseDto } from 'src/modules/orders/dto/order-response.dto';

export class HistoricResponseDto extends OrderResponseDto {
    @ApiProperty({
        name: 'orderState',
        description: 'Finished order state',
        default: 'HISTORIC',
        enum: OrderState,
        example: 'HISTORIC',
    })
    orderState: OrderState;
}
