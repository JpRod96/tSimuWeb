function hideLoadingImage(){
    let toHideDiv=document.querySelector("#loading");
    let toShowDiv=document.querySelector("#content-div");
    toShowDiv.classList.remove("hidden");
    toHideDiv.classList.add("hidden");
}

async function start(states){
    let elementArray = [];
    chargeElementArray(elementArray, states);
    console.log(elementArray);
}

function chargeElementArray(elementArray, states){
    for(let state of states){
        let id=state.name;
        elementArray.push(document.querySelector("#"+id));
    }
}