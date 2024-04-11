import { ItemsService } from './items.service'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { Response } from 'express'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from './pipes/validation'
import { createItemSchema } from './schema/item'
import AuthGuard from 'src/auth/guards/auth.guards'
import { PublicAcces } from 'src/auth/Decorators/public'
import { AdminAcces } from 'src/auth/Decorators/admin'
import RolesGuard from 'src/auth/guards/roles.guards'
import { Roles } from 'src/auth/Decorators/roles'
import { ROLES } from 'src/auth/constants/roles'

@UseGuards(AuthGuard, RolesGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Roles(ROLES.CREATOR)
  @AdminAcces()
  @Post()
  @UsePipes(new ZodValidationPipe(createItemSchema))
  create(@Res() res: Response, @Body() createItemDto: CreateItemDto) {
    const newItem = this.itemsService.create(createItemDto)
    res.status(HttpStatus.CREATED).json(newItem)
  }

  @PublicAcces()
  @Get()
  findAll() {
    return this.itemsService.findAll()
  }
  @PublicAcces()
  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.itemsService.findOne(uuid)
  }

  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.update(uuid, updateItemDto)
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.itemsService.remove(uuid)
  }
}
