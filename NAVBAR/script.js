let container  = document.querySelector(".container");
let btnOpen = document.getElementById("open");
let btnClose = document.getElementById("close");
btnOpen.addEventListener("click", function (){
    btnOpen.classList.remove("active");
    container.classList.add('active');
    btnClose.classList.add("active");
})
btnClose.addEventListener("click", () => {
    btnClose.classList.remove("active");
    container.classList.remove('active');
    btnOpen.classList.add("active");
});