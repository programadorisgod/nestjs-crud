import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { Item } from './entities/item.entity'

@Injectable()
export class ItemsService {
  private listItems: Array<Item> = []

  create(createItemDto: CreateItemDto) {
    const newItem: Item = {
      id: crypto.randomUUID(),
      name: createItemDto.name,
      description: createItemDto.description,
    }

    this.listItems.push(newItem)
    return `new item create with id: ${newItem.id}`
  }

  findAll() {
    return this.listItems
  }

  findOne(id: string) {
    const item = this.listItems.filter((item) => item.id === id)

    if (item.length === 0) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND)
    }
    return item
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item ${updateItemDto}`
  }

  remove(id: string) {
    return `This action removes a #${id} item`
  }
}
