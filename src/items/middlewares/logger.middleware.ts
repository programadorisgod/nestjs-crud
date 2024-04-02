import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request METODO: ${req.method}`)
    next()
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...')
  next()
}
