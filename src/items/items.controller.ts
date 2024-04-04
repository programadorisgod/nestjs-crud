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
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from './pipes/validation'
import { createItemSchema } from './schema/item'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createItemSchema))
  create(@Res() res: Response, @Body() createItemDto: CreateItemDto) {
    const newItem = this.itemsService.create(createItemDto)
    res.status(HttpStatus.CREATED).json(newItem)
  }

  @Get()
  findAll() {
    return this.itemsService.findAll()
  }

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
