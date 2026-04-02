let hourHand = document.querySelector('#hour');
let minuteHand = document.querySelector('#minute');
let secondHand = document.querySelector('#second');
let startBtn = document.querySelector('.start');
let stopBtn = document.querySelector('.stop');
let resetBtn = document.querySelector('.reset');    
let resumeBtn = document.querySelector('.resume');
let h = 0, m = 0 , s = 0 , deg = 0;
let timer, degTimer;
function zero(h,i){
    if (h<10){
        i.innerText = `0${h}`;
    }
    else{
        i.innerText = h;
    }
}
startBtn.addEventListener('click',()=>{
    timer = setInterval(() => {
        s++;
        if(s==60){
            s=0;
            m++;
            if(m==60){
                m=0;
                h++;
                if(h==12){
                    h=0;
                }
            }
        }
        zero(h,hourHand);
        zero(m,minuteHand);
        zero(s,secondHand);
    }, 15.5);
   degTimer = setInterval(() => { 
        deg+=10;
        secondHand.style.transform = `rotate(${deg}deg)`;
        if (m > 0 ){
            minuteHand.style.transform = `rotate(${deg}deg)`;
            if (h > 0 ){
            hourHand.style.transform = `rotate(${deg}deg)`;
            }
        }
        
        if(deg ==10){
            deg=-20;
        }
        else{
            deg+=10;
        };
    

    }, 1000);
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
});
stopBtn.addEventListener('click',()=>{
   clearInterval(timer);
   clearInterval(degTimer);
   stopBtn.style.display = 'none';
   resumeBtn.style.display = 'inline-block';
   resetBtn.style.pointerEvents = 'auto';
   resetBtn.style.opacity = '1';
});
resumeBtn.addEventListener('click',()=>{
   startBtn.click();
    resumeBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
});
resetBtn.addEventListener('click',()=>{
   clearInterval(timer);
   clearInterval(degTimer);
   h=0;
   m=0;
   s=0;
   deg=0;
   zero(h,hourHand);
   zero(m,minuteHand);
   zero(s,secondHand);
   secondHand.style.transform = `rotate(0deg)`;
   minuteHand.style.transform = `rotate(0deg)`;
   hourHand.style.transform = `rotate(0deg)`;
   resetBtn.style.pointerEvents = 'none';
   resetBtn.style.opacity = '0.5';
   resumeBtn.style.display = 'none';
   stopBtn.style.display = 'none';
   startBtn.style.display = 'inline-block';

}   );