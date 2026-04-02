let dolar = 11700;
onload = function(){
    document.getElementById('price').textContent = ` ( ${dolar} )`
}
function getValueD() {
    const inputId = document.getElementById('dolar');
    const valuee = parseFloat(inputId.value);
    const total = valuee * dolar;
    
    if (isNaN(valuee)) {
        inputId.value = "";
        inputId.placeholder="Enter the Right amount";
        inputId.style.color = 'red';
        document.getElementById('h_r').textContent =""
      return;
    }
    inputId.placeholder="Enter the amount";
    inputId.style.color = 'black';
    document.getElementById('h_r').textContent = ` ل.س ${total}`;
    inputId.value = "";


};
function getValueS(){
    const inputId = document.getElementById('syrian');
    const valuee = parseFloat(inputId.value);
    const total = valuee / dolar; 

    if (isNaN(valuee)) {
        inputId.value = "";
        inputId.placeholder="Enter the Right amount";
        inputId.style.color = 'red';
        document.getElementById('h_r2').textContent =""
        return;
    }
    inputId.placeholder="Enter the amount";
    inputId.style.color = 'black';
    document.getElementById('h_r2').textContent = `${total.toFixed(2)} $`;
    inputId.value= "";

};
