import { Socket } from "socket.io-client";

export var socket = undefined as Socket | undefined;

export const setSocket = (value: Socket | undefined) => {
  socket = value;
}