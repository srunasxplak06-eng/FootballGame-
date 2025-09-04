let player1 = {x:100,y:150};
let player2 = {x:650,y:150};
let ball = {x:385,y:185,vx:0,vy:0};
let score=[0,0];

const p1=document.getElementById('player1');
const p2=document.getElementById('player2');
const b=document.getElementById('ball');
const scoreEl=document.getElementById('score');
const goal1=document.getElementById('goal1');
const goal2=document.getElementById('goal2');

function update(){
  p1.style.left=player1.x+'px'; p1.style.bottom=player1.y+'px';
  p2.style.left=player2.x+'px'; p2.style.bottom=player2.y+'px';
  b.style.left=ball.x+'px'; b.style.bottom=ball.y+'px';
}

function moveBall(){
  ball.x+=ball.vx; ball.y+=ball.vy; ball.vx*=0.95; ball.vy*=0.95;

  if(ball.x<0){ball.x=0; ball.vx*=-1;}
  if(ball.x>770){ball.x=770; ball.vx*=-1;}
  if(ball.y<0){ball.y=0; ball.vy*=-1;}
  if(ball.y>370){ball.y=370; ball.vy*=-1;}

  if(ball.y<=50 && ball.x>goal1.offsetLeft && ball.x<goal1.offsetLeft+100){
    score[1]++; alert('🎉 Player 2 ทำประตู!'); resetBall();
  }
  if(ball.y<=50 && ball.x>goal2.offsetLeft && ball.x<goal2.offsetLeft+100){
    score[0]++; alert('🎉 Player 1 ทำประตู!'); resetBall();
  }

  scoreEl.textContent=`Player 1: ${score[0]} | Player 2: ${score[1]}`;
}

function resetBall(){ ball.x=385; ball.y=185; ball.vx=0; ball.vy=0; }

function kick(player){
  let dx=ball.x-player.x, dy=ball.y-player.y;
  let dist=Math.sqrt(dx*dx+dy*dy);
  if(dist<50){ ball.vx=dx/5; ball.vy=dy/5; }
}

document.addEventListener('keydown',e=>{
  const speed=10;
  switch(e.key){
    case 'w':player1.y+=speed;break;
    case 's':player1.y-=speed;break;
    case 'a':player1.x-=speed;break;
    case 'd':player1.x+=speed;break;
    case 'ArrowUp':player2.y+=speed;break;
    case 'ArrowDown':player2.y-=speed;break;
    case 'ArrowLeft':player2.x-=speed;break;
    case 'ArrowRight':player2.x+=speed;break;
  }
  kick(player1); kick(player2); update();
});

function gameLoop(){ moveBall(); update(); requestAnimationFrame(gameLoop); }

update(); gameLoop();
