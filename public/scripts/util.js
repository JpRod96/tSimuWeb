function hideLoadingImage(){
    let toHideDiv=document.querySelector("#loading");
    let toShowDiv=document.querySelector("#content-div");
    toShowDiv.classList.remove("hidden");
    toHideDiv.classList.add("hidden");
}

async function start(states){
    let elementArray = [];
    chargeElementArray(elementArray, states.length);
    hideBars(elementArray);
    for(let index=0; index<states.length; index++){
        await startProgressBar(elementArray[index], states[index]);
    }
}

function chargeElementArray(elementArray, length){
    for(let id=0; id<length; id++){
        elementArray.push(document.querySelector("#st-"+id));
    }
}

function hideBars(array){
    for(let element of array){
        let progressBar = element.querySelector(".barraProgreso");
        let bar = progressBar.querySelector("div");
        bar.classList.add('hide');
    }
}

async function startProgressBar(element, state){
    let timeMs=state.msDuration;
    let progressBar = element.querySelector(".barraProgreso");
    let bar = progressBar.querySelector("div");
    bar.classList.add("bgTurkish");
    let label = bar.querySelector("label");
    let content = label.innerHTML;
    label.innerHTML=""
    let percentage=0;
    bar.classList.remove('hide');
    if(timeMs>0){
        bar.style.width = percentage+'%';
        bar.classList.remove('hide');
        for(let index=1; index<=100; index++){
            await sleep(timeMs);
            percentage++;
            bar.style.width = percentage+'%';
        }   
    }
    bar.classList.remove("bgTurkish");
    label.innerHTML=content;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createPdf() {
    console.log("esta entrando");
    const toCanvas = document.querySelector("#canvas");
    let pdf = new jsPDF('p', 'pt', 'a4');
    let elementHandler = {
    };
    pdf.fromHTML(toCanvas, 15, 15, { 'elementHandlers': elementHandler });
    /*let iframe = document.createElement('iframe');
    iframe.setAttribute('style', 'position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
    document.body.appendChild(iframe);
    iframe.src = pdf.output('datauristring');*/
    const formName = "Reporte";
    pdf.save(formName+" Principal");
    
}