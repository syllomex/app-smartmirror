import React, { useContext, useMemo, useEffect } from 'react';

import socket, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { apiURL } from '../services/api';

const SocketContext = React.createContext(
  {} as { io: Socket<DefaultEventsMap, DefaultEventsMap> }
);

const client = () => socket(apiURL);

const SocketProvider: React.FC = ({ children }) => {
  const io = useMemo(() => client(), []);

  useEffect(() => {
    return () => {
      io.disconnect();
    };
  }, [io]);

  return (
    <SocketContext.Provider value={{ io }}>{children}</SocketContext.Provider>
  );
};

const useSocket = () => {
  const { io } = useContext(SocketContext);
  return { io };
};

export { SocketProvider, useSocket };
