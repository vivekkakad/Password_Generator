
 const  passwordDisplay = document.querySelector('[data-passwordDisplay]');
 const copyBtn = document.querySelector("[data-copybtn]");
 const copyMsg = document.querySelector("[data-copyMsg]");
 const lenghtDisplay = document.querySelector("[data-passwordLength]");
 const inputSlider = document.querySelector("[data-lenghtSlder]");
 const uppercaseCB = document.querySelector('#uppercase');
 const lowercaseCB = document.querySelector('#lowercase');
 const symbolCB = document.querySelector('#symbol');
 const numberCB = document.querySelector('#number');
 const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const generateButton = document.querySelector(".generate-password");
const Indicator = document.querySelector("[data-strenghtIndicator]");

let password ="";
let passwordLength = 10;


let cheakedCount = 0;

let symbol = "!@#$%^&*()_+{}|:'<>?/.,';\][=-`~"

function handleSlider(){
    inputSlider.value = passwordLength;
    lenghtDisplay.innerText = passwordLength;
}

handleSlider();

inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
});




function getRandInteger(max, min){
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandNumber(){
    return getRandInteger(1,10);
    
}
function getRandUpper(){
    let upAlpha = getRandInteger(65,91);
    return String.fromCharCode(upAlpha);
}

function getRandLower(){
    let loAlpha = getRandInteger(97,123);
    return String.fromCharCode(loAlpha);
}

function getRandSymbol(){
    let randIndex =  getRandInteger(0,symbol.length);
    return symbol.charAt(randIndex);
}

//handle check box and check count


allCheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change', countCheckedCb);
});

function countCheckedCb(){
    cheakedCount = 0;

    allCheckbox.forEach((checkbox) => {
        if(checkbox.checked) cheakedCount++;
    });

    if(passwordLength < cheakedCount){
        passwordLength = cheakedCount;
        handleSlider();
    }
}






async function copyContent(){
    try{
        if(password == ""){
            alert('Please select option');
            
            throw 'Failed';
        }
        
        await navigator.clipboard.writeText(password);
        copyMsg.innerText = 'Copied';
    }
    catch(error){
        copyMsg.innerText=error;
    }
    
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000    );
}

copyBtn.addEventListener('click' ,()=>{
    copyContent();
});


function setIndicator(color){
    Indicator.style.backgroundColor = color;
    Indicator.style.boxShadow = '0px 0px 12px 1px ${color}'  ;
}

setIndicator('#ccc');

function calcStrenght(){
    let upCase = false;
    let loCase = false;
    let num = false;
    let sys = false;

    if(uppercaseCB.checked) upCase=true;
    if(lowercaseCB.checked) loCase=true;
    if(numberCB.checked) num=true;
    if(symbolCB.checked) sys=true;

    if(upCase && loCase && (num || sys) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if((upCase || loCase) && (num || sys) && passwordLength >= 6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }

}


// Shuffle the array randomly - Fisher Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // find out random j
      const j = Math.floor(Math.random() * (i + 1));
      // swap 2 numbers
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    // array.forEach((el) => (str += el));
    str = array.join("");
    return str;
}


//generate button

function generatePassword(){
    if(cheakedCount<=0){
        alert(" Select atleast One option");
        return;
    }

    if(passwordLength < cheakedCount){
        passwordLength = cheakedCount;
        handleSlider();
    }

    if(password.length){
        password ="";
    }

    let checkArr =[];

    if(uppercaseCB.checked) checkArr.push(getRandUpper);
    if(lowercaseCB.checked) checkArr.push(getRandLower);
    if(numberCB.checked) checkArr.push(getRandNumber);
    if(symbolCB.checked) checkArr.push(getRandSymbol);

    //fixed
    for(let i=0;i<checkArr.length;i++){
        password += checkArr[i]();
    }

    //remaining
    for(let i=0;i< (passwordLength-checkArr.length) ;i++){
        let randIndex = getRandInteger(0,checkArr.length);
        password += checkArr[randIndex]();
    }

    password = shuffleArray(Array.from(password));
    passwordDisplay.value = password;
    console.log('password :', password);

    calcStrenght();


}

generateButton.addEventListener('click',generatePassword);
