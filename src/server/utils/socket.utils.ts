// Typings
import { Socket } from 'socket.io';
import { SetupSocketSubscribersArgs } from '../typings/socket.typings';


export const subscribeTo = <T>(
  client: Socket,
  eventName: string,
  handler: (args: T) => void
): void => {
  client.on(eventName, handler);
}


export const unsubscribe = <T>(
  client: Socket,
  eventName: string,
  handler: (args: T) => void
): void => {
  client.removeListener(eventName, handler);
}


export const emit = <T>(
  client: Socket,
  eventName: string,
  payload?: T
): void => {
  client.emit(eventName, payload);
}


export const setupSocketSubscribers = ({
  client,
  socketHandlersConfig,
  playerInstance
}: SetupSocketSubscribersArgs): void => {
  socketHandlersConfig.forEach(socketHandler => {
    subscribeTo(client, socketHandler.eventName, (payload?: unknown) => {
      socketHandler.handler({ client, playerInstance, payload });
    });
  });
};
