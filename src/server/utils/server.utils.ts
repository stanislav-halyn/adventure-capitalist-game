// Typings
import http, { OutgoingHttpHeaders } from 'http';
import { Socket } from 'socket.io';


export const handlePreflightRequest = (_: http.IncomingMessage, res: http.ServerResponse): void => {
  const headers: OutgoingHttpHeaders = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  };

  res.writeHead(200, headers);
  res.end();
};


export const getClientId = (client: Socket): string => {
  const header = client.handshake.headers.authorization;

  if (!header) {
    return '';
  }

  const [, clientId] = header.split(' ');

  return clientId;
};
