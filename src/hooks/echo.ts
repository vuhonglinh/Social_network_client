import { useEffect, useState } from 'react'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from 'axios'

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

window.Pusher = Pusher
const useEcho = new Echo({
  broadcaster: 'reverb',
  key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
  authorizer: (channel: any) => {
    return {
      authorize: (socketId: any, callback: any) => {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcasting/auth`, {
          socket_id: socketId,
          channel_name: channel.name,
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        })
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
  wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
  wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
  wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
  forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
  enabledTransports: ['ws', 'wss'],
});



export default useEcho
