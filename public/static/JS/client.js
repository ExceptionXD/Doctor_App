const socket = io.connect('http://localhost:3000');
//DOM Queries

const chatWindow = document.getElementById('incoming');
const message = document.getElementById('messageText');
const btn = document.getElementById('sendBtn');
const outgoing  = document.getElementById('outgoing');
const incoming  = document.getElementById('incoming');



//Emit Events
btn.addEventListener('click', ()=>{
  socket.emit('message',{message : message.value })
})

//Listen for Events
socket.on('message',(data)=>{
  chatWindow.innerHTML += `<p class="incoming alert alert-primary" style="width: fit-content; height: fit-content;" >${data.message}</p>`
  message.value=''
})