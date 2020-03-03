console.log('start')

const socket = io('http://localhost:8080');

socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data sdsdsdsd' });
});