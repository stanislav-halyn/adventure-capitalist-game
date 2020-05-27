// Typings
import { Socket } from 'socket.io';
import { IPlayer } from '@src/game-core';


export type SetupSocketSubscribersBaseArgs = {
  client: Socket
  playerInstance: IPlayer
};


export type SetupSocketSubscribersArgs = SetupSocketSubscribersBaseArgs & {
  socketHandlersConfig: SocketHandlersConfig
};


export type SocketEmitterBaseArgs = {
  client: Socket,
  playerInstance: IPlayer
};


export type SocketEmitterArgs<T> = SocketEmitterBaseArgs & {
  payload: T
};


export type SocketHandlerArgs = {
  client: Socket,
  playerInstance: IPlayer
  payload: any // eslint-disable-line
}


export type SocketHandlerConfig = {
  eventName: string,
  handler: (args: SocketHandlerArgs) => void
};


export type SocketHandlersConfig = Array<SocketHandlerConfig>
