dino=document.querySelector('.dino');
gameOver=document.querySelector('.gameOver');
obstacle=document.querySelector('.obstacle');
scoreCont=document.querySelector('#scoreCont');
jump=document.querySelector('.jump');



jump.addEventListener('touchstart',(e)=>{
    // console.log(e);
    dino.classList.add('animateDino');
    setTimeout(()=>{
        dino.classList.remove('animateDino');
    },700);
},true);

jump.addEventListener('touchend')

score=0;
cross=true;

audioGameOver= new Audio("gameOver.wav");
audioJump= new Audio("jump.wav");
audioBackground=new Audio("background.opdownload");

setTimeout(() => {
    audioBackground.play();
},1000);

document.onkeydown=function(e){
    // console.log("key code : ", e.keyCode);
    if(e.keyCode==38){
        dino.classList.add('animateDino');
        setTimeout(()=>{
            dino.classList.remove('animateDino');
        },700);
    }
    if(e.keyCode==39){
       dinoX=parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
       dino.style.left=dinoX+112+"px";
    }
    if(e.keyCode==37){
        dinoX=parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left=[dinoX-112]+"px";
     }
    
}

setInterval(()=>{
    dx=parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy=parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX=Math.abs(dx-ox);
    offsetY=Math.abs(dy-oy);
    // console.log(offsetX,offsetY);
    if(offsetX<90 && offsetY< 111){
        gameOver.style.visibility='visible';
        gameOver.classList.add('over');
        obstacle.classList.remove('obstacleAni');
        //music
        audioGameOver.play();
       setTimeout(()=>{
        // audioGameOver.pause(); 
        audioBackground.pause();
       },1000);
        p=document.querySelector('p');
        p.innerText='Reload to play again';
        p.style.color='blue';
    }else if(offsetX<145 && cross){
        // console.log(offsetX);
        audioJump.play();
        score++;
        updateScore(score);
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000);
        setTimeout(()=>{
            aniDur=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
        newDur=aniDur-0.1;
        obstacle.style.animationDuration=newDur+'s';
        },500);
    }
},100);

function updateScore(score){
    scoreCont.innerText= `your Score : ${score}`;
}