// Typings
import { Socket } from 'socket.io';
import { IPlayer } from '@src/game-core';


export type SetupSubscribersBaseArgs = {
  client: Socket
  playerInstance: IPlayer
};


export type SetupSocketSubscribersArgs = SetupSubscribersBaseArgs & {
  socketHandlersConfig: HandlersConfig
};


export type EmitterBaseArgs = {
  client: Socket,
  playerInstance: IPlayer
};


export type EmitterArgs<T> = EmitterBaseArgs & {
  payload: T
};


export type HandlerArgs = {
  client: Socket,
  playerInstance: IPlayer
  payload: any // eslint-disable-line
}


export type HandlerConfig = {
  eventName: string,
  handler: (args: HandlerArgs) => void
};


export type HandlersConfig = Array<HandlerConfig>
