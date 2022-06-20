import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ExploreContainer from '../components/ExploreContainer';
import { setSocket, socket } from '../helpers/socket';
import './Tab1.css';

const Tab1: React.FC = () => {

  const [socketReady, setSocketReady] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {

    if (socket) {
      socket.removeAllListeners();

      if (socket.listeners("connect").length === 0) {
        socket.on('connect', () => {
          console.log('connected')
          setConnected(true);
        })
      }

      if (socket.listeners("connect_error").length === 0) {
        socket.on('connect_error', (error: any) => {
          console.log(error);
        })
      }
    }

    if (socket && !connected) {
      socket.connect();
    }
  }, [socketReady, connected]);


  useEffect(() => {
    let timeout = setTimeout(() => {
      setSocket(io('wss://support.digilifesoftware.com',
        {
          transports: ['websocket'],
          query: {
            token: '75ea94020f8bd418bbc2fcb7091469207aee71a38bbfc0ddfa9a0873dd05e772',
            applicationId: '85ba5f98-2e5a-ec11-9f23-86d7c8f29239'
          }
        }));
      setSocketReady(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
          !socketReady && <IonText className='middle'>Socket is connecting...</IonText>
        }
        {
          socketReady && !connected && <IonText color="danger" className='middle'>Socket is ready, establishing connection...</IonText>
        }
        {
          connected && <IonText className='middle' color="success">Socket is connected</IonText>
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
