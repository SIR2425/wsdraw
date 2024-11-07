// Connect to the server
const socket = io();

document.getElementById('sendMessage').addEventListener('click',  envia);

function envia() {
    const message = document.getElementById('messageInput').value;
    socket.emit('message', message);
    document.getElementById('messageInput').value = '';
}

socket.on('message', data => {
    let n = document.createElement('div');
    n.innerHTML = data;
    console.log(n);
    document.getElementById('messages').appendChild(n);
});
