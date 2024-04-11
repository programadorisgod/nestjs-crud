import { SetMetadata } from '@nestjs/common'
import { IS_PUBLIC_KEY } from '../constants/keyDecorators'

export const PublicAcces = () => SetMetadata(IS_PUBLIC_KEY, true)
