const divInput = document.getElementById('file');
const input = document.querySelector('#file input');
const namefile = document.querySelector('.name p');
const sizefile = document.querySelector('.time p');
const iconvideo = document.querySelector('.icon');
const btnx = document.querySelector('.download button');
const text = document.querySelector('.text');
const progressBar = document.getElementById("progressBar");
const btnCancel = document.querySelector('.cancel');
const btnUpload = document.querySelector('.upload');
const links = document.querySelectorAll('.add a');
const iconDownload = document.querySelector('.upload-container svg')
let i = 1 

links.forEach((link) =>{
    const allchild = link.children;
    if(link.className === 'adding'){
        return
    }
    else{
        allchild[0].addEventListener('click' , () =>
        {
            allchild[1].style.opacity = '1'
            allchild[1].style.pointerEvents = 'auto'
            allchild[0].style.opacity = '0'
            allchild[0].style.pointerEvents = 'none'
            links.forEach((l)=>{
                if(l.children[0] == allchild[0] || l.className == 'adding'){
                    return
                }
                else{
                    l.children[1].style.opacity = '0'
                    l.children[1].style.pointerEvents = 'none'
                    l.children[0].style.opacity = '1'
                    l.children[0].style.pointerEvents = 'auto'
                }
            });
            
        })
    }
})


// منع السلوك الافتراضي على الصفحة كلها
window.addEventListener("dragover", e => e.preventDefault());
window.addEventListener("drop", e => e.preventDefault());

// الضغط
divInput.addEventListener("click", () => {
    if (i >= 1){
        btnx.click()
        input.click();
        iconDownload.style.opacity = '0'
    }
    else{
        return
    }
    i=0
});
links[2].addEventListener('click',() => divInput.click());
btnUpload.addEventListener('click' ,() => divInput.click()); 
btnCancel.addEventListener('click' ,() => btnx.click()); 

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024; // الكيلوبايت يساوي 1024 بايت
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    // معادلة رياضية لاختيار الوحدة المناسبة (KB أو MB أو غيرها)
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // إرجاع الرقم مقسوماً على الوحدة مع تقريبه لرقمان بعد الفاصلة
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
// عند اختيار ملف بالطريقة العادية
input.addEventListener("change", () => {
    const file = input.files[0];
    lodingfile(file)
    const fileName = file.name
    const cleanName = fileName.replace(".mp4", "");
    const cleanall= cleanName.replace(/\.[^/.]+$/, "");
    const fillmb= formatFileSize(file.size); // تحويله لـ MB مثلاً
    if(file){
        btnx.style.opacity = '1';
        btnx.style.pointerEvents = 'auto';
        iconvideo.style.opacity = '1';
        namefile.textContent =cleanall ;
        sizefile.textContent = `MP4 . ${fillmb}`;
        progressBar.style.opacity = '1'
    }
});

function lodingfile(file){
    
    const fillSize = file.size; // حجم الملف الحقيقي
    const startTime = new Date().getTime();
    const timespan = document.querySelector('.time  span');
    let loaded = 0;
    let interval = setInterval(() => {
        // محاكاة رفع 5 ميجابايت في كل مرة
        loaded += 5000000; 
        if (loaded >= fillSize) {
            loaded =fillSize;
            clearInterval(interval);
            i +=1
            iconDownload.style.opacity = '1'
        }

        // حساب النسبة والوقت (نفس المنطق السابق)
        const percent = (loaded / fillSize) * 100;
        const currentTime = new Date().getTime();
        const duration = (currentTime - startTime) / 1000;
        const second = (fillSize - loaded) / (loaded / duration);
        // تحديث الواجهة
        progressBar.value = percent;
        timespan.innerText = ` ${Math.round(second)} sec left`;
        
    }, 500); // تحديث كل نصف ثانية
    btnx.addEventListener('click' , () =>{
        btnx.style.opacity = '0';
        btnx.style.pointerEvents = 'none';
        iconvideo.style.opacity = '0';
        sizefile.innerHTML = ''
        namefile.innerHTML = ''
        timespan.innerText = ''
        progressBar.style.opacity = '0'
        clearInterval(interval);
        i=1
        iconDownload.style.opacity = '0'
    })
}
