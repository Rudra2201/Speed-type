const typingText = document.querySelector(".typing-text p"),
inpField  = document.querySelector(".wrapper .input-field"),
mistakeTag = document.querySelector(".mistakes span"),
timeTag = document.querySelector(".time span"),
cpmTag = document.querySelector(".cpm span"),
wpmTag = document.querySelector(".wpm span"),
tryAgainBtn = document.querySelector("button");

let timer,istyping = 0,
maxtime = 60,
timeleft = maxtime;

let charIndex = mistakes = 0;
function randomParagraph(){

    //getting random number which is always less than pargraphs' length
    typingText.innerHTML="";
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag =  `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");

    //focusing input field on keydown

    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if(charIndex < characters.length - 1 && timeleft>0)
    {
        if(!istyping)
    {   
     timer = setInterval(initTimer,1000);
     istyping = 1;
    }
    if(typedChar== null)
    {
        charIndex--;
        if(characters[charIndex].classList.contains("incorrect"))
        mistakes--;

        characters[charIndex].classList.remove("correct","incorrect","active");
    }
    else{
        if(characters[charIndex].innerText === typedChar)
        {
            characters[charIndex].classList.add("correct");
        }
        else
        {
            characters[charIndex].classList.add("incorrect");
            mistakes++;
            console.log(mistakes);
        }
        charIndex++;
    }
    }
    else{
        inpField.value="";
        clearInterval(time);
    }
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round((((charIndex-mistakes)/5)/(maxtime-timeleft))*60);
    wpm = wpm<0 || !wpm || wpm===Infinity ? 0 : wpm;

    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex-mistakes;
    wpmTag.innerText = wpm;
}

function initTimer()
{
    if(timeleft>0)
    {
        timeleft--;
        timeTag.innerText = timeleft;
        if(timeleft<10)
        {
            timeTag.style.color="red";
        }
        else
        {
            timeTag.style.color="black";
        }
        
    }
    else{
        clearInterval(timer);
    }

}
function resetGame()
{
    randomParagraph(); 
    timeleft = maxtime;
    charIndex = mistakes = istyping = 0;
    timeTag.innerText = timeleft;
    cpmTag.innerText = 0;
    wpmTag.innerText = 0;
    mistakeTag.innerText = mistakes;
    inpField.value="";
    clearInterval(timer); 
}
randomParagraph(); 
inpField.addEventListener("input",initTyping)
tryAgainBtn.addEventListener("click",resetGame);
