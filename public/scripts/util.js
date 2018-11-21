function hideLoadingImage(){
    let toHideDiv=document.querySelector("#loading");
    let toShowDiv=document.querySelector("#content-div");
    toShowDiv.classList.remove("hidden");
    toHideDiv.classList.add("hidden");
}