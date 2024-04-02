import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ItemsService } from './items.service'
import { ItemsController } from './items.controller'
import { LoggerMiddleware } from './middlewares/logger.middleware'

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('items')
  }
}
