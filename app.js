var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var Sio=require('socket.io');
var app = express();

var io=Sio();
app.io=io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



//game logic starts here

var Socket_list={};

var player_list={};

var bullet_list ={};


io.on('connection',function(socket){
    console.log("new one connected");
    socket.id=Math.random();
    socket.x=0;
    socket.y=0;
    
    
    socket.name=""+Math.random();
   
    
    Socket_list[socket.id]=socket;
    
   
    
  
    
    socket.on('disconnect',function(){
        delete Socket_list[socket.id];
    });
    socket.on('updatePlayer',function(data){
    
    var player={};
    player.x=data.x;
    player.y=data.y;
    player.id=data.id;
    player.left=data.left;
    player.gunrotation=data.gunrotation;    
    player_list[data.id]=player;
     
    
        
    
    socket.emit('serverUpdate',{player:player_list})
    
});
   socket.on('fire',function(data){
       
       //console.log("here ");
       var bullet={};
       
       bullet.x=data.x;
       bullet.y=data.y;
       bullet.id=data.id;
       bullet.angle=data.angle;
       bullet_list[data.id]=bullet;
       
       socket.emit('brushFire',{bullet:bullet_list});
       
       
       
   });
    
});




/**setInterval(function(){
    
    
    var pack=[];
    
    
    for(var i in Socket_list)
        {
            var socket=Socket_list[i];
        
            socket.emit('newPosition',pack);
        }
    
},100);

*/



// ends here



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
