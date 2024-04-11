import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ItemsModule } from './items/items.module'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ItemsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
