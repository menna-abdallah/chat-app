const socket = io();
let currentUser = ''; 

document.getElementById('loginBtn').addEventListener('click', () => {
  currentUser = document.getElementById('username').value.trim();
  if (currentUser) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('page-content').style.display = 'flex';
  }
});

document.getElementById('sendBtn').addEventListener('click', () => {
  const message = document.getElementById('messageContent').value.trim();
  if (message) {
    socket.emit('message', { username: currentUser, message }); 
    document.getElementById('messageContent').value = '';
  }
});

socket.on('message', (data) => {
  const { username, message } = data;
  const messageNode = document.createElement('div');
  if (username === currentUser) { 
    messageNode.textContent = message; 
    messageNode.classList.add('message', 'my-message'); 
  } else {
    messageNode.textContent = `${username}: ${message}`; 
    messageNode.classList.add('message', 'other-message'); 
  }
  document.getElementById('chat-content').appendChild(messageNode);
});
