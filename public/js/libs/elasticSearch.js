var socket = io();

var locationButton = jQuery('#searchMb');
locationButton.on('click', function () {
  socket.emit('searchM', {
    name: 'sdvdvsdvs',
  });
});
