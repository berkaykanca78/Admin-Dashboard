var socket = io.connect("http://localhost:3000/messages");
// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');
var username = document.getElementById('username').textContent;

socket.emit('username',{
    username:username
});

socket.on('con', function (con) {
    feedback.innerHTML += '&nbsp;&nbsp;'+con+'<br>';
});

socket.on('dis',function(dis){
    feedback.innerHTML += '&nbsp;&nbsp;'+dis+'<br>';
})
// Emit events
btn.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function () {
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function (data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});




























// $(() => {
//     const socket = io.connect('http://localhost:3000');
//     /*const username = $("#username").text();
//     const title = $("#title").text();
//     socket.emit('username',{
//         username:username,
//         title:title
//     })*/
// })