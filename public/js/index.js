var socket = io();
socket.on('connect',function(){
    console.log("connected to server");
});

socket.on('disconnect',function(){
    console.log("Disconnect to server");
});

socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');        
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        from:message.from,
        text:message.text,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);

});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');    
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target = "_blank">My Current location</a>')
    // li.text(`${message.from}::${formattedTime} `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

var messageTextbox = jQuery('[name=message]');
jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text: messageTextbox.val()
    },function(){
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Share Locaation');        
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude: position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Share Locaation');                
        alert('Unable to fetch location');
    })
});