const { ExpressPeerServer } = require('peer');

const peerServer = (server, app) => {

    const peerServer = ExpressPeerServer(server, {
        path: ''
      });
      
      app.use('/webrtc/peerjs', peerServer);



      peerServer.on('connection', (client) => { 

        console.log('coonect', client.getId())
       });


       peerServer.on('close', (client) => {

        console.log('close', client.getId())

       });
}


module.exports = peerServer