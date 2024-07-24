import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '@/common/bases/base.response';
import { Order } from './entities/order.entity';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<BaseResponse<Order[]>> {
    const result = await this.orderService.findAll();
    return BaseResponse.success('Get orders successfully', result);
  }
}
