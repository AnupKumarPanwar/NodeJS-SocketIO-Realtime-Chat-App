var socket = io();
function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
  socket.emit('chatMessage', from, message);
}
$('#m').val('').focus();
  return false;
}
 
function notifyTyping() {
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}
 
socket.on('chatMessage', function(from, msg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
 
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
 
});
 
socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});
 
$(document).ready(function(){
  var name = makeid();
  // alert(name);

if(name=="undefined" || name==null || name=="")
{

  name="";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
  for( var i=0; i < 5; i++ ) 
  {
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  }


}



   
  
      $('#user').val(name);
     socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
 

   
   
    
      
});
 
function makeid() {

  var text=prompt("Please Enter Your Name");
  if(name=="undefined" || name=="null" || name=="")
  {
  $("#user").val(text);
  $("#user").hide();
  return text;
  }
  else
  makeid();

}

