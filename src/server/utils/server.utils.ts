// Typings
import http, { OutgoingHttpHeaders } from 'http';
import { Socket } from 'socket.io';


export const handlePreflightRequest = (req: http.IncomingMessage, res: http.ServerResponse): void => {
  const headers: OutgoingHttpHeaders = {
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Origin": req.headers.origin,
    "Access-Control-Allow-Credentials": "true"
  };

  res.writeHead(200, headers);
  res.end();
};


export const getClientId = (client: Socket): string => {
  const header = client.handshake.headers['authorization'];
  const [, clientId] = header.split(' ');

  return clientId;
}
