"use strict"

class person
    {
        
        
        constructor(game)
        {
            this.game=game;
            this.facingleft=false;
    
        
        }
        
        createplayer()
        {
            var game=this.game;
            var dude =game.add.sprite(32,32,'body');
            game.physics.enable(dude, Phaser.Physics.ARCADE);     
            dude.body.bounce.y = 0.2;
            dude.body.collideWorldBounds = true;
            dude.body.setSize(200, 500);
            dude.life=100;
            this.player=dude;
            //return dude;  
        }
        
        createcomponents()
        {
            var game=this.game;
            
            //declearing componenets
            
            this.leg1=game.add.sprite(0,0,'leg');
            this.leg2=game.add.sprite(0,0,'leg');
            this.body=game.add.sprite(0,0,'body');
            this.gun=game.add.sprite(0,0,'gun');
            this.face=game.add.sprite(0,0,'head');
            this.hand=game.add.sprite(0,0,'hand');
            this.hand2=game.add.sprite(0,0,'hand');
            
            
            //setting anchor points
            this.leg1.anchor.setTo(.5,0)
            this.leg2.anchor.setTo(.5,0)
            this.gun.anchor.setTo(.1,.4);
            this.player.anchor.setTo(.5);
            this.face.anchor.setTo(.5,1);
            this.body.anchor.setTo(.5)
            this.hand.anchor.setTo(.1,.5);
            this.hand2.anchor.setTo(.0,.5);
           
            
            
            //setting scaling
            
            this.player.scale.setTo(.2,.2);
            this.body.scale.setTo(.2,.2);
            this.face.scale.setTo(.2,.2);
            this.leg1.scale.setTo(.2,.2);
            this.leg2.scale.setTo(.2,.2);
            this.gun.scale.setTo(.18,.18)
            this.hand.scale.setTo(.2,.2);
            this.hand2.scale.setTo(.2,.2);

             
            this.game.world.bringToTop(this.body);
            this.game.world.bringToTop(this.gun);
            this.game.world.bringToTop(this.hand);
            
            
            
        }
        attachcomponentswithplayer()
        {
                  this.gun.x=this.player.x-5;
                  this.gun.y=this.player.y+34;
                  this.leg1.y=this.player.y+55;
                  this.leg2.y=this.player.y+55;
                  this.face.y=this.player.y+25;
                  this.body.y=this.player.y+42;
                  this.hand.y=this.gun.y+6;
                  this.hand2.y=this.hand.y;
        }
        
         lookLeft()
        {
                    this.player.scale.setTo(-.2,.2);
                    this.body.scale.setTo(-.2,.2);
                    this.face.scale.setTo(-.2,.2);
                    this.leg1.scale.setTo(-.2,.2);
                    this.leg2.scale.setTo(-.2,.2);
                    this.hand.scale.setTo(-.2,.2);
                    this.gun.scale.setTo(-.18,.18);
                    this.hand2.scale.setTo(-.2,.2);
        }
        lookRight()
        {
                this.player.scale.setTo(.2,.2);
                this.body.scale.setTo(.2,.2);
                this.face.scale.setTo(.2,.2);
                this.leg1.scale.setTo(.2,.2);
                this.leg2.scale.setTo(.2,.2);
                this.gun.scale.setTo(.18,.18);
                this.hand.scale.setTo(.2,.2);
                this.hand2.scale.setTo(.2,.2);
                
        }
        
         controlmovement()
        {
             var game=this.game;
             var changeunit=game.physics.arcade.angleToPointer(this.gun);
      
            if(this.facingleft)
                {
                    
                      this.lookLeft();
            
                     this.leg1.x=this.player.x-15;
                     this.leg2.x=this.player.x+3;
                     this.face.x=this.player.x;
                     this.body.x=this.player.x-2;
                     this.hand.x=this.gun.x+10;
                     this.hand2.x=this.player.x-5;
                    
                    
                    
                    
                    
                    this.gun.rotation = 3+changeunit;
                    this.hand.rotation=3+changeunit;
                    
                    
                    
                    if(changeunit<4 && changeunit>1.6)
                        {
                            this.face.rotation=3+this.gun.rotation/2;
                            this.bulletangle=-180+this.gun.angle;
                            
                        }
                    else{
                        this.bulletangle=180+this.gun.angle;
                        this.face.rotation=this.gun.rotation/2;
                    }
                    this.hand2.rotation=this.face.rotation;
                    if(changeunit<1.6 && changeunit>   -1.6 )
                        {
                          
                          this.facingleft=false;   
                        }
                }
            else{
                
                     
                this.lookRight();
                
                this.leg1.x=this.player.x-5;
                this.leg2.x=this.player.x+15;
                this.face.x=this.player.x-5;
                this.body.x=this.player.x;
                this.hand.x=this.gun.x-10;
                this.hand2.x=this.player.x+5;
                
                 this.gun.rotation = game.physics.arcade.angleToPointer(this.gun);
                this.hand.rotation=changeunit;
                
                this.bulletangle=this.gun.angle;
                
                this.face.rotation=changeunit/2;
                this.hand2.rotation=this.face.rotation;
                if(changeunit>1.6  || changeunit<-1.6 )
                    {
                        this.facingleft=true; 
                    }
                    
                
                }
            
        }
        controlmovementother(changeangle)
        {
             var game=this.game;
             var changeunit=changeangle;
           
            if(this.facingleft)
                {
                    
                      this.lookLeft();
            
                     this.leg1.x=this.player.x-15;
                     this.leg2.x=this.player.x+3;
                     this.face.x=this.player.x;
                     this.body.x=this.player.x-2;
                     this.hand.x=this.gun.x+10;
                     this.hand2.x=this.player.x-5;
                    
                    
                    
                    
                    
                    this.gun.rotation = changeunit;
                    this.hand.rotation=changeunit;
                    
                    
                    
                    if(changeunit<3.1416 && changeunit>1.6)
                        {
                           
                            this.face.rotation=this.gun.rotation/2;
                            this.bulletangle=-180+this.gun.angle;
                            
                        }
                    else if(changeunit>3.1416)
                        {
                            this.face.rotation=3.1416+this.gun.rotation/2;
                            this.bulletangle=-180+this.gun.angle;
                        }
                    else{
                        this.bulletangle=180+this.gun.angle;
                        this.face.rotation=this.gun.rotation/2;
                    }
                    this.hand2.rotation=this.face.rotation;
                    if(changeunit<1.6 && changeunit>   -1.6 )
                        {   
                          this.facingleft=false;   
                        }
                }
            else{
                
                     
                this.lookRight();
                
                this.leg1.x=this.player.x-5;
                this.leg2.x=this.player.x+15;
                this.face.x=this.player.x-5;
                this.body.x=this.player.x;
                this.hand.x=this.gun.x-10;
                this.hand2.x=this.player.x+5;
                
                 this.gun.rotation = changeunit;
                this.hand.rotation=changeunit;
                
                this.bulletangle=this.gun.angle;
                
                this.face.rotation=changeunit/2;
                this.hand2.rotation=this.face.rotation;
                if(changeunit>1.6  || changeunit<-1.6 )
                    {
                        this.facingleft=true; 
                    }
                    
                
                }
            
        }
        initbullet()
        {
            var game=this.game;
             var playerBullets=game.add.group();
             playerBullets.enableBody=true;             
             playerBullets.setAll('checkWorldBounds', true);
             playerBullets.setAll('outOfBoundsKill', true);
             return playerBullets;
        }
        fire(playerBullets)
        {
            var game=this.game;
             var bullet=playerBullets.getFirstExists(false);
             
              
             
              if(!bullet)
                 {
                    bullet=this.CreateBullet(game,this.bulletx,this.bullety);
                    playerBullets.add(bullet);
                    
                 }
              else
                 {
                   
                    bullet.reset(this.bulletx,this.bullety);
                 }
             
             game.physics.arcade.velocityFromAngle(this.bulletangle, 3000, bullet.body.velocity);
             bullet.body.allowGravity=false;
            
            
            var bulletproperties ={
                
                x:bulletx,
                y:bullety,
                angle:this.bulletangle
            }
            
            return bulletproperties;
            
            
            
            
        }
        brushFire(playerBulletsx,y,angle,id)
        {
           // here bullet will be fired;
            
            
            
            
            
            
            
            
            
            
            
            
            
        }
        CreateBullet(game,x,y)
         {
             var b=game.add.sprite(x,y,'bullet');
             b.anchor.setTo(.5);
             b.scale.setTo(.2);
             b.checkWorldBounds=true;
             b.outOfBoundsKill=true;
            
             return b;
         }
        bulletxy()
        {
              this.bulletx=(Math.cos(this.gun.rotation)*(this.gun.width-(this.gun.width/10)))+this.gun.x;
              this.bullety=(Math.sin(this.gun.rotation)*(this.gun.width-(this.gun.width/10)))+this.gun.y;
        } 
        resetplayer(x,y,left,rotation)
        {
            this.player.x=x;
            this.player.y=y;
            this.facingleft=left;
            this.attachcomponentswithplayer();
            this.controlmovementother(rotation);
            
            
            
        }
        
        
        
        
        
    }