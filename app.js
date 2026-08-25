// LOADING SCREEN
var loaderMessages = [
  'Initializing...',
  'Loading assets...',
  'Setting up UI...',
  'Almost ready...',
  'Welcome!'
];

var loaderProgress = 0;
var loaderInterval = setInterval(function(){
  loaderProgress += 2;

  // تحديث شريط التحميل
  document.getElementById('loaderBar').style.width = loaderProgress + '%';

  // تغيير النص حسب التقدم
  if (loaderProgress === 20) document.getElementById('loaderText').textContent = loaderMessages[1];
  if (loaderProgress === 40) document.getElementById('loaderText').textContent = loaderMessages[2];
  if (loaderProgress === 65) document.getElementById('loaderText').textContent = loaderMessages[3];
  if (loaderProgress === 85) document.getElementById('loaderText').textContent = loaderMessages[4];

  // لما يوصل 100% — أخفي الـ loader
  if (loaderProgress >= 100) {
    clearInterval(loaderInterval);
    setTimeout(function(){
      document.getElementById('loader').classList.add('hide');
    }, 400);
  }
}, 40);


// ═══════════════════════════════════════
// SIDE MENU
// ═══════════════════════════════════════

let open = false;

// جلب عناصر القائمة الجانبية
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const menuItems = document.querySelectorAll(".menu-links li");
const bars = document.querySelectorAll(".bar");

// فتح القائمة الجانبية
function openMenu(){
    open = true;

    // إظهار القائمة من اليمين
    sideMenu.style.right = "0";

    // تفعيل الخلفية الضبابية
    overlay.style.background = "rgba(0,0,0,.45)";
    overlay.style.backdropFilter = "blur(5px)";
    overlay.style.pointerEvents = "auto";

    // تحويل الأيقونة لـ X
    bars[0].style.transform = "translateY(8px) rotate(45deg)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "translateY(-8px) rotate(-45deg)";

    // ظهور عناصر القائمة بالتتابع
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
        }, index * 100);
    });
}

// إغلاق القائمة الجانبية
function closeMenu(){
    open = false;

    // إخفاء القائمة لليمين
    sideMenu.style.right = "-420px";

    // إخفاء الخلفية الضبابية
    overlay.style.background = "rgba(0,0,0,0)";
    overlay.style.backdropFilter = "blur(0px)";
    overlay.style.pointerEvents = "none";

    // رجوع الأيقونة لشكلها الأصلي
    bars[0].style.transform = "none";
    bars[1].style.opacity = "1";
    bars[2].style.transform = "none";

    // إخفاء عناصر القائمة
    menuItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateX(40px)";
    });
}

// زر فتح/إغلاق القائمة
document.getElementById("menuBtn").addEventListener("click", () => {
    open ? closeMenu() : openMenu();
});

// زر الإغلاق داخل القائمة
document.getElementById("closeBtn").addEventListener("click", closeMenu);

'use strict';

// إغلاق القائمة عند الضغط على أي رابط داخلها
document.querySelectorAll(".menu-links a").forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

// ═══════════════════════════════════════
// TOAST — رسائل الإشعار
// ═══════════════════════════════════════

function toast(msg) {
    var el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    // إخفاء الرسالة بعد 3 ثواني
    setTimeout(function(){ el.classList.remove('show'); }, 3000);
}

// ═══════════════════════════════════════
// FLIP CARD — بطاقة الملف الشخصي
// ═══════════════════════════════════════

// قلب البطاقة عند الضغط عليها
document.getElementById('flipWrap').addEventListener('click', function(){
    document.getElementById('flipCard').classList.toggle('flipped');
});

// ═══════════════════════════════════════
// MODAL SYSTEM — نظام النوافذ المنبثقة
// ═══════════════════════════════════════

// فتح مودال بإضافة class "open"
function openModal(id) {
    document.getElementById(id).classList.add('open');
}

// إغلاق مودال بإزالة class "open"
function closeModal(id) {
    document.getElementById(id).classList.remove('open');
}


// ═══════════════════════════════════════
// PROJECTS MODAL
// ═══════════════════════════════════════

// إغلاق نافذة My Projects
document.getElementById('xProj').addEventListener('click', function () {
    closeModal('mProj');
});

// إغلاق My Projects عند الضغط على الخلفية
document.getElementById('mProj').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal('mProj');
    }
});

// فتح My Projects عند الضغط على البطاقة
document.getElementById('projCard').addEventListener('click', function () {
    openModal('mProj');
});


// ═══════════════════════════════════════
// WEB PORTFOLIO
// ═══════════════════════════════════════

// Web Portfolio ليس رابطًا
// يعرض رسالة فقط لأنه الصفحة الحالية
document.getElementById('rowPort').addEventListener('click', function () {
    closeModal('mProj');
    toast('You are already viewing the Web Portfolio!');
});


// ═══════════════════════════════════════
// ESC KEY
// ═══════════════════════════════════════

document.addEventListener('keydown', function (e) {

    if (e.key !== 'Escape') return;

    // إذا My Projects مفتوح
    if (document.getElementById('mProj').classList.contains('open')) {
        closeModal('mProj');
        return;
    }

    // إذا لا يوجد مودال مفتوح — اقلب البطاقة للوجه الأمامي
    document.getElementById('flipCard').classList.remove('flipped');
});
// ═══════════════════════════════════════
// SCROLL REVEAL — ظهور العناصر عند التمرير
// ═══════════════════════════════════════

function checkReveal(){
    document.querySelectorAll('.reveal').forEach(function(el){
        // لو العنصر ظهر في الشاشة — أضف class "on"
        if (el.getBoundingClientRect().top < window.innerHeight - 60) {
            el.classList.add('on');
            // تحريك أشرطة المهارات
            el.querySelectorAll('.bar-fill').forEach(function(b){
                b.style.width = b.getAttribute('data-w') + '%';
            });
        }
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', function(){
    // عداد الأيام يبدأ من 0 ويصل لـ 1000
    var n = 0, el = document.getElementById('statDays');
    var iv = setInterval(function(){ n++; el.textContent = n; if(n>=1000) clearInterval(iv); }, 10);
    setTimeout(checkReveal, 150);
});

// ═══════════════════════════════════════
// TABLE — جدول لغات البرمجة
// ═══════════════════════════════════════

var tblVisible = true;

// إظهار/إخفاء الجدول
document.getElementById('toggleTblBtn').addEventListener('click', function(){
    tblVisible = !tblVisible;
    document.getElementById('tblWrap').style.display = tblVisible ? '' : 'none';
    toast(tblVisible ? 'Table shown' : 'Table hidden');
});

// ترتيب الجدول حسب السنة
document.getElementById('sortYrBtn').addEventListener('click', function(){
    var tb = document.getElementById('tblBody');
    var rows = Array.from(tb.rows);
    rows.sort(function(a,b){
        return parseInt(a.querySelector('.yr-pill').textContent) -
               parseInt(b.querySelector('.yr-pill').textContent);
    });
    rows.forEach(function(r){ tb.appendChild(r); });
    updateTblFoot(); toast('🗓 Sorted by year');
});

// ترتيب الجدول بالضغط على رأس العمود
var colDir = {};
document.querySelectorAll('th[data-col]').forEach(function(th){
    th.addEventListener('click', function(){
        var c = parseInt(this.getAttribute('data-col'));
        var asc = !colDir[c]; colDir = {}; colDir[c] = asc;
        var tb = document.getElementById('tblBody');
        var rows = Array.from(tb.rows);
        rows.sort(function(a,b){
            var av = c===2 ? parseInt(a.querySelector('.yr-pill').textContent) : a.cells[c].textContent.trim();
            var bv = c===2 ? parseInt(b.querySelector('.yr-pill').textContent) : b.cells[c].textContent.trim();
            return av < bv ? (asc?-1:1) : av > bv ? (asc?1:-1) : 0;
        });
        rows.forEach(function(r){ tb.appendChild(r); });
        updateTblFoot();
    });
});

// إظهار/إخفاء نموذج إضافة لغة جديدة
document.getElementById('addRowBtn').addEventListener('click', function(){
    var p = document.getElementById('addPanel');
    p.style.display = p.style.display === 'block' ? 'none' : 'block';
});

// إلغاء إضافة لغة جديدة
document.getElementById('cancelAddBtn').addEventListener('click', function(){
    document.getElementById('addPanel').style.display = 'none';
});

// حفظ لغة جديدة في الجدول
document.getElementById('saveLangBtn').addEventListener('click', function(){
    var n  = document.getElementById('nName').value.trim();
    var cr = document.getElementById('nCreator').value.trim();
    var y  = document.getElementById('nYear').value.trim();
    if (!n||!cr||!y) { toast('⚠️ Fill all fields'); return; }
    var ico = langIcons[n.toLowerCase()];
    var row = document.createElement('tr');
    row.innerHTML = '<td>'+ico+' '+n+'</td><td>'+cr+'</td><td><span class="yr-pill">'+y+'</span></td><td><button class="act-btn edit">✏ Edit</button><button class="act-btn del">🗑 Del</button></td>';
    document.getElementById('tblBody').appendChild(row);
    bindRowBtns(row);
    // تنظيف الحقول بعد الحفظ
    document.getElementById('nName').value = '';
    document.getElementById('nCreator').value = '';
    document.getElementById('nYear').value = '';
    document.getElementById('addPanel').style.display = 'none';
    updateTblFoot(); toast('"' + n + '" added!');
});

// ربط أزرار تعديل وحذف كل صف
function bindRowBtns(row){
    // تعديل الصف
    row.querySelector('.edit').addEventListener('click', function(){
        var r = this.closest('tr');
        var n = prompt('Language:', r.cells[0].textContent.trim()); if(n!==null) r.cells[0].textContent = n;
        var c = prompt('Creator:',  r.cells[1].textContent.trim()); if(c!==null) r.cells[1].textContent = c;
        var y = prompt('Year:', r.querySelector('.yr-pill').textContent); if(y!==null) r.querySelector('.yr-pill').textContent = y;
        updateTblFoot(); toast('Updated');
    });
    // حذف الصف
    row.querySelector('.del').addEventListener('click', function(){
        if (!confirm('Delete this row?')) return;
        this.closest('tr').remove(); updateTblFoot(); toast('🗑 Deleted');
    });
}

// ربط الأزرار للصفوف الموجودة مسبقاً
document.querySelectorAll('#tblBody tr').forEach(bindRowBtns);

// تحديث إحصائيات أسفل الجدول
function updateTblFoot(){
    var rows = document.querySelectorAll('#tblBody tr');
    if (!rows.length) { document.getElementById('tblFoot').innerHTML = '<span>No data</span>'; return; }
    var yrs = Array.from(rows).map(function(r){ return parseInt(r.querySelector('.yr-pill').textContent); });
    document.getElementById('tblFoot').innerHTML =
        '<span><strong>'+rows.length+'</strong> languages</span>'+
        '<span>Range: <strong>'+Math.min.apply(null,yrs)+'–'+Math.max.apply(null,yrs)+'</strong></span>'+
        '<span><strong>'+rows.length+'</strong> creators</span>';
}

// ═══════════════════════════════════════
// COURSE DETAILS — تفاصيل الكورس
// ═══════════════════════════════════════

// إظهار/إخفاء تفاصيل الكورس
document.getElementById('detailBtn').addEventListener('click', function(){
    var p = document.getElementById('detailPanel');
    var open = p.style.display === 'block';
    p.style.display = open ? 'none' : 'block';
    this.textContent = open ? 'Show Course Details' : 'Hide Course Details';
});

// ═══════════════════════════════════════
// TYPING EFFECT — تأثير الكتابة للاسم
// ═══════════════════════════════════════

const text = "Suhaib Al - Rawashdeh";
const nameElement = document.getElementById("name");

nameElement.textContent = ""; // تفريغ الاسم أولاً

let index = 0;

// كتابة حرف واحد كل 120ms
function typeName(){
    if(index < text.length){
        nameElement.textContent += text[index];
        index++;
        setTimeout(typeName, 120);
    }
}

window.onload = typeName; // تشغيل التأثير عند تحميل الصفحة