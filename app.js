let input = document.getElementById('input');
let output = document.getElementById('result');
const startBtn = document.getElementById('start');
const copyBtn = document.getElementById('copy');
const reloadBtn = document.getElementById('reload');
const alertBox = document.getElementById('alert');
const select = document.getElementById('select');
const link = document.getElementById('link');

startBtn.addEventListener('click',(e) =>{
    const inputObj = getOptionValue();
    const option = inputObj.option;
    const entries = inputObj.entries;
    // console.log(option,entries)
    
    link.textContent = setOutput(option,entries)
    // link.textContent = 'e'
    e.preventDefault()
})

function getOptionValue(){
    let option = select.value;
    let entries = input.value.trim().split(' ');

    select.addEventListener('change', () => {
        option = select.value;
    })

    return {option, entries}
}

function setOutput(option,entries){
    switch (option) {
        case 'skulist':
            const result = `https://www.gamestop.it/SearchResult/QuickSearch?listSkus=${entries.toString()}`      
            //check before retunring value
            return result.replace(/,{2,}/g, ',');   
            break;
        case 'carousel':
            let cardArray = [];
            entries.forEach(el =>{
                cardArray += '<div class="card" data-sku="'+ el +'"></div>';
            })
            //check before retunring value
            cardArray = cardArray.replaceAll('</div><div class="card" data-sku="">','');
            return cardArray.toLocaleString();
            break;
        case 'custom':
            return 'test'            
            break;
        default:
            return `https://www.gamestop.it/SearchResult/QuickSearch?listSkus=${entries.toLocaleString()}`            
            break;
    }
}

function disable(el,check){
    if(!check){
        el.style.pointerEvents = 'none';
        el.style.opacity = .5;
    }else{
        el.style.pointerEvents = 'auto';
        el.style.opacity = 1; 
    }
}

function copyAll() {
    let first = document.getElementById('link').textContent;
    let second = document.getElementById('result').textContent;
    let full = first + second;
    navigator.clipboard.writeText(full);
    showAlert();
    setTimeout(showAlert,1500);
}

function reLoad() {
    output.textContent ='';
    input.value='';
}

function showAlert(){
  alertBox.classList.toggle("active");
}

