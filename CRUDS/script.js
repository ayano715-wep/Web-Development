const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const total = document.getElementById('total');
const discount = document.getElementById('discount');
const number = document.getElementById('number');
const category = document.getElementById('category');
const btnCreate = document.getElementById('btn-creat');
const search = document.getElementById('inp-search');
const btnDelete = document.getElementById('btn-delete');
const allNumber = document.getElementById('num-all');
const sumValue = document.getElementById('value');
const tableElement = document.getElementById('table');
const nav = document.querySelector('nav')
const backNav = document.querySelector('.backNav');
const links = document.querySelectorAll('nav a');
const linksAbout =  document.querySelectorAll('.navigation a');
const w_h2 = document.getElementById('welcome-h2');
const welcomeMsg = document.querySelector('.welcome-msg');
const cards = document.querySelectorAll('.feature-card');
let scrollValue = 228

//دالة تحريك الcards 
function cardAnimation (){
    cards.forEach((card , index) => {
        card.classList.add(`card${index + 1}`);
    });
}


// 1. تشغيل الدالة عند التمرير
window.addEventListener('scroll',() => {
    let vscoll = 926
    if (window.innerWidth < 600){ 
        vscoll = 560
    }
    if (window.scrollY >= vscoll){
            cards.forEach((card , index) => {
            card.classList.remove(`card${index + 1}`);
        });
        }
        else{
            cardAnimation()
        }
});

// 2. تشغيل الدالة فور تحميل الصفحة (Reload)
window.addEventListener('DOMContentLoaded', cardAnimation);

let timer;
let isVisibleNavActive = false; // "مفتاح" لمنع تكرار إضافة المستمعين

function hideNav() {
    nav.style.display = 'none';
}

function showNav() {
    nav.style.display = 'flex';
}

function resetTimer() {
    showNav();
    clearTimeout(timer);
    timer = setTimeout(hideNav, 1500);
}

// دالة لمعالجة الحركة مع استثناء الحقول النصية
const handleMove = (e) => {
    if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
    resetTimer();
};

// s1.5  اخفاء السكرول اثناء عدم التحرك لمدة  
window.addEventListener('scroll', () => {
    let ts = 299;
    if (window.innerWidth < 600){ 
        ts = 210
    }
    if (window.scrollY >= ts) {
        // إذا لم يكن المنطق مفعلاً، نقوم بتفعيله
        if (!isVisibleNavActive) {
            document.addEventListener("mousemove", handleMove);
            document.addEventListener("touchmove", handleMove);
            document.addEventListener("scroll", resetTimer);
            resetTimer(); // تشغيل المؤقت فوراً عند الوصول للنقطة
            isVisibleNavActive = true;
        }
    } else {
        // عند العودة للأعلى، نقوم بتنظيف المستمعين وإظهار النافبار بشكل دائم
        if (isVisibleNavActive) {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("touchmove", handleMove);
            document.removeEventListener("scroll", resetTimer);
            clearTimeout(timer);
            showNav();
            isVisibleNavActive = false;
        }
    }
});

// //اخفاء زر الحذف عند البحث 
search.addEventListener('keyup', () => {
    btnDelete.style.display = 'none';
    if (search.value === '') {
        btnDelete.style.display = 'block';
    }
});

// الرجوع ل اول الصفحة 
links[0].addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
linksAbout[0].addEventListener('click' ,() => links[0].click())

// الانتقال لقسم الانشاء
links[1].addEventListener('click',()=>{
    const el =  document.getElementById('main');
    let tt = 100
    if (window.innerWidth < 600){ 
        tt = 50
    }
    scrollTo({
        top: el.offsetTop - tt,
        behavior: "smooth"
    });
    
})
linksAbout[1].addEventListener('click',()=>links[1].click())

// الانتقال لقسم البحث
links[2].addEventListener('click',()=>{ 
    let tt = 100
    if (window.innerWidth < 600){ 
        tt = 60
    }
    scrollTo({
        top: search.offsetTop - tt,
        behavior: "smooth"
    });
})
linksAbout[2].addEventListener('click' ,() => links[2].click());

// الانتقال لقسم البيانات
links[3].addEventListener('click',()=>{ 
    tableMove = document.querySelector('.data');
    let tt = 10
    if (window.innerWidth < 600){ 
        tt = 38
    }
    scrollTo({
        top: tableMove.offsetTop - tt,
        behavior: "smooth"
    });
})
linksAbout[3].addEventListener('click' ,() => links[3].click());

// الانتقال لقسم About
links[4].addEventListener('click',()=>{ 
    let MaxY = document.documentElement.scrollHeight
    scrollTo({
        top:MaxY,
        behavior: "smooth"
    });
})

linksAbout[4].addEventListener('click' ,() => links[4].click());
//اعطاء لون افتراضي عند تحميل الصفحة 
links[0].style.color = "#F8C662";

// بشكل اقصر للهواتف  navbar عرض ال 
if (window.innerWidth < 600){ 
    scrollValue = 140
    w_h2.addEventListener('click', () => {
    welcomeMsg.classList.toggle('active');
});
}

// خلفية الازرار من اجل الانتقال بين الازرار
links.forEach(link => { 
    link.addEventListener('click', (e) => {
        const move = link.dataset.move;
        backNav.style.transform = `translateX(${move}%)`;
        links.forEach(l => l.style.color = "rgba(255, 255, 255, 0.82)");
        
        e.currentTarget.style.color = "#F8C662";
    });
});

// عند المرور للاسفل  navbar لاظهار ال  
window.addEventListener('scroll', () => {
    if (window.scrollY > scrollValue) {
        nav.classList.add('navbar');
    } else {
        nav.classList.remove('navbar');
    }
});


let dataPro = [];   // تعريف المصفوفة وجلب البيانات القديمة

//التاكد من المعلومات اذا لم تكن فارغة جلبها و وضعها في المصفوفة 
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}
function Deletsearch(){
    if (search.value != ''){
        setTimeout(() =>{
            search.value = ''
            btnDelete.style.display = 'block';
            if (tableElement.innerHTML == ''){
                showData()
            }
        }, 120000)
    }
}
// focus if press enter
function Enterpress(element1 , next=null){
    element1.addEventListener('keydown',function(e){
        if (e.key === 'Enter') {

            if (next) {
                next.focus();
            } else {
                btnCreate.click();
                element1.blur();
            }
        }
    });
};
Enterpress(title,price)
Enterpress(price,taxes)
Enterpress(taxes,discount)
Enterpress(discount,number)
Enterpress(number,category)
Enterpress(category)

// التنقل ب الاسهم 
function arrowNavigate(element, map) {
    element.addEventListener('keydown', function (e) {
        if (map[e.key]) {
            e.preventDefault();
            map[e.key].focus();
        }
    });
}
arrowNavigate(title , {ArrowDown:price})
arrowNavigate(price , {ArrowDown:number ,ArrowUp:title ,ArrowRight:taxes})
arrowNavigate(taxes , {ArrowRight:discount ,ArrowLeft:price,ArrowUp:title,ArrowDown:number})
arrowNavigate(discount , {ArrowLeft:taxes,ArrowUp:title,ArrowDown:number})
arrowNavigate(number , {ArrowRight:category ,ArrowUp:discount})
arrowNavigate(category , {ArrowLeft:number})

// defult value for inputs
function defultValue(defult) {
    if (defult.value != ''){
        return defult.value;
    } else {
        return defult.value = '_';
    } 
};

// all item number
function allItem() {
    allNumber.innerText = dataPro.length;
    sumValue.innerHTML = `All (<span class="sum">${dataPro.length}</span>)`
};

// calculate total 
function getTotal() {    
    if (price.value != ''){
        let sum = `${+price.value  + Number(taxes.value) - +discount.value}`;
        total.innerHTML = `total : ${sum}`;
        total.style.color = '#81bd5fff'
        total.style.textShadow = '0 0 2px rgba(9, 12, 9, 0.73)';
        return sum;
    } else {
        total.innerHTML = 'total : -';
        return '_';
    }
};

// دالة تفريغ الحقول بعد انشاء منتج  
function clearData(){ 
        title.value = '';
        price.value = '';
        taxes.value = '';
        total.innerText = 'total : ';
        total.style.color = 'rgba(255, 255, 255, 0.579)';
        total.style.textShadow = 'none';
        discount.value = '';
        number.value = '';
        category.value = '';
};

// انشاء العنصر حسب الرقم المدخل 
function createNumber(num){
    if (number.value == '')
    {
        number.value = 1
    }
    for (let i=0; i<number.value; i++){
        dataPro.push(num);
    }
}

//Create
btnCreate.addEventListener('click', function () {
    if (
        title.value === ''
    ) {
        title.focus();
        return;
    }
    btnCreate.innerText = "Create"
    let data = {
        title:defultValue(title),
        price:defultValue(price),
        taxes: defultValue(taxes),
        discount: defultValue(discount),
        total: total.innerText =`${getTotal()}`, 
        category: defultValue(category),
    };
    createNumber(data)
    localStorage.setItem('product', JSON.stringify(dataPro)); // حفظ المصفوفة كاملة
    allItem();
    showData();
    clearData() 
});

//Read 
function showData() {
    let table = ' ';
    for (let i = 0; i < dataPro.length; i++) {
        table +=  ` 
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="update(${i})" class="btn-update">Update</button></td>
            <td><button onclick="deleteData(${i})" class="btn-delete">Delete</button></td>
        </tr>`;
    }
    tableElement.innerHTML = table;
    allItem();
    optionInfo()
    Deletsearch()
}

//Delete item
function deleteData(i) {
    dataPro.splice(i , 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

//Update 
function update(i){
    if (title.value != '' || price.value != '' || taxes.value != '' || discount.value != '' || number.value != '' || category.value != ''){
        return
    }
    function check(propName) {
        let value = dataPro[i][propName];
        
        if (value !== '_') {
            return value;
        } 
        else {
            return '';
        }
    }
    if (dataPro[i].title === '_' && dataPro[i].price === '_'  && dataPro[i].taxes === '_' && dataPro[i].discount === '_' && dataPro[i].total === '_'  && dataPro[i].category === '_')
    {
        btnCreate.innerText = "Create";
    }
    else{
        btnCreate.innerText = "Update";
        }
    title.value = check('title')
    price.value = check('price')
    taxes.value = check('taxes')
    discount.value = check('discount')
    category.value = check('category')
    dataPro.splice(i , 1);
    localStorage.setItem('product', JSON.stringify(dataPro)); // حفظ المصفوفة كاملة
    showData();
}

//Delete All
btnDelete.addEventListener('click', function(){
    localStorage.clear();
    dataPro = [];
    tableElement.innerHTML = " ";
    allItem();
});

// OPTION for search
function optionInfo(){
    let option = new Set();
    for (let i=0; i < dataPro.length; i++){
        if (dataPro[i].title !== '_' ){
            option.add(dataPro[i].title);
        }
        if (dataPro[i].category !== '_'){
            option.add(dataPro[i].category);
        }
    }
    let opValue = ' ';
    
    option.forEach(function(value){
        opValue +=
                `<option value="${value}"></option>
                `
        })
    document.getElementById('info').innerHTML = opValue
    
};

// عند كتابة كلمة تظهر المنتجات حسب هذه الكلمة
search.addEventListener('input', function (e) {
    let value = this.value.toLowerCase();
    let all = '';
    let sum = 0;
    for (let i = 0; i < dataPro.length; i++) {
        if (
            dataPro[i].title.toLowerCase().includes(value) ||
            dataPro[i].category.toLowerCase().includes(value)
        ) {
            all += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="update(${i})" class="btn-update">Update</button></td>
                    <td><button onclick="deleteData(${i})" class="btn-delete">Delete</button></td>
                </tr>
            `;
            sum++
        }
    }
    tableElement.innerHTML = all;
    sumValue.innerHTML = `All (<span class="sum">${sum}</span>)`
    Deletsearch()
});

// و جلب اول قيمة تظهر في الليست enter سهولة البحث ب الضغط على 
search.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        let value = this.value.toLowerCase();
        let options = document.getElementById('info').options;

        for (let i = 0; i < options.length; i++) {
            if (options[i].value.toLowerCase().startsWith(value)) {
                this.value = options[i].value;
                break;
            }
        }
    }
});

showData();      // localStorage عرض البيانات بعد جلبها من ال 