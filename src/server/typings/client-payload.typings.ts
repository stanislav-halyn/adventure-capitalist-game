// Typings
import { BusinessIdType } from '@src/game-core';

type ClientPayloadType<T> = {
  data: T
}

export type UpdateBusinessClientPayload = ClientPayloadType<{ businessId: BusinessIdType }>
