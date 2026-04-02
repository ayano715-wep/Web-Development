const input = document.getElementById('input-list');
const btn = document.getElementById('but');
const list = document.getElementById('list')
input.focus()
function CreateLi(value){
    return `<li>${value}<button onclick='delet(this)'}'>X</button></li>
    `
}
btn.addEventListener('click' , () => {
    if (input.value != ''){
        list.innerHTML +=CreateLi(input.value);
        input.value  = ''
        
    }
    else{
        input.focus()
    }
})
input.addEventListener('keydown' ,function(e){
    if (e.key ==='Enter'){
        btn.click()
    }
})
function delet(bt){
    bt.parentElement.remove()
}