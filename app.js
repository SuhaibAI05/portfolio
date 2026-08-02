let open = false;

const sideMenu = document.getElementById("sideMenu");

const overlay = document.getElementById("overlay");

const menuItems = document.querySelectorAll(".menu-links li");

const bars = document.querySelectorAll(".bar");

function openMenu(){

    open = true;

    sideMenu.style.right = "0";

    overlay.style.background = "rgba(0,0,0,.45)";
    overlay.style.backdropFilter = "blur(5px)";
    overlay.style.pointerEvents = "auto";

    bars[0].style.transform =
    "translateY(8px) rotate(45deg)";

    bars[1].style.opacity = "0";

    bars[2].style.transform =
    "translateY(-8px) rotate(-45deg)";

    menuItems.forEach((item,index)=>{

        setTimeout(()=>{

            item.style.opacity = "1";
            item.style.transform = "translateX(0)";

        },index * 100);

    });
}

function closeMenu(){

    open = false;

    sideMenu.style.right = "-420px";

    overlay.style.background = "rgba(0,0,0,0)";
    overlay.style.backdropFilter = "blur(0px)";
    overlay.style.pointerEvents = "none";

    bars[0].style.transform = "none";

    bars[1].style.opacity = "1";

    bars[2].style.transform = "none";

    menuItems.forEach(item=>{

        item.style.opacity = "0";
        item.style.transform = "translateX(40px)";

    });
}

document.getElementById("menuBtn")
.addEventListener("click",()=>{

    open ? closeMenu() : openMenu();

});

document
.getElementById("closeBtn")
.addEventListener("click", closeMenu);
'use strict';
 document
.querySelectorAll(".menu-links a")
.forEach(link=>{

    link.addEventListener("click",()=>{

        closeMenu();

    });

});

function toast(msg) {
  var el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(function(){ el.classList.remove('show'); }, 3000);
}
 
document.getElementById('flipWrap').addEventListener('click', function(){
  document.getElementById('flipCard').classList.toggle('flipped');
});
 

function openModal(id)  { document.getElementById(id).classList.add('open');    }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
 
document.getElementById('xProj').addEventListener('click', function(){ closeModal('mProj'); });
document.getElementById('xPs').addEventListener('click',   function(){ closeModal('mPs');   });
document.getElementById('xCalc').addEventListener('click', function(){ closeModal('mCalc'); });
document.getElementById('xTic').addEventListener('click', function(){ closeModal('mTic'); });
['mProj','mPs','mCalc','mTic'].forEach(function(id){
  document.getElementById(id).addEventListener('click', function(e){
    if (e.target === this) closeModal(id);
  });
});
 

document.addEventListener('keydown', function(e){
  if (e.key !== 'Escape') return;
  if (document.getElementById('mTic').classList.contains('open'))  { closeModal('mTic');  return; }
  if (document.getElementById('mCalc').classList.contains('open')) { closeModal('mCalc'); return; }
  if (document.getElementById('mPs').classList.contains('open'))   { closeModal('mPs');   return; }
  if (document.getElementById('mProj').classList.contains('open')) { closeModal('mProj'); return; }
  document.getElementById('flipCard').classList.remove('flipped');
});
 

document.getElementById('projCard').addEventListener('click', function(){ openModal('mProj'); });
 
// Project rows
document.getElementById('rowPs').addEventListener('click',   function(){ closeModal('mProj'); openModal('mPs');   });
document.getElementById('rowCalc').addEventListener('click', function(){ closeModal('mProj'); openModal('mCalc'); });
document.getElementById('rowPort').addEventListener('click', function(){ closeModal('mProj'); toast('🌐 You are already viewing the Web Portfolio!'); });
 
function checkReveal(){
  document.querySelectorAll('.reveal').forEach(function(el){
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add('on');
      el.querySelectorAll('.bar-fill').forEach(function(b){
        b.style.width = b.getAttribute('data-w') + '%';
      });
    }
  });
}
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', function(){

  var n = 0, el = document.getElementById('statDays');
  var iv = setInterval(function(){ n++; el.textContent = n; if(n>=1000) clearInterval(iv); }, 10);
  setTimeout(checkReveal, 150);
});
 

var tblVisible = true;
document.getElementById('toggleTblBtn').addEventListener('click', function(){
  tblVisible = !tblVisible;
  document.getElementById('tblWrap').style.display = tblVisible ? '' : 'none';
  toast(tblVisible ? ' Table shown' : ' Table hidden');
});
 
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
 
document.getElementById('addRowBtn').addEventListener('click', function(){
  var p = document.getElementById('addPanel');
  p.style.display = p.style.display === 'block' ? 'none' : 'block';
});
document.getElementById('cancelAddBtn').addEventListener('click', function(){
  document.getElementById('addPanel').style.display = 'none';
});
 
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
  document.getElementById('nName').value = '';
  document.getElementById('nCreator').value = '';
  document.getElementById('nYear').value = '';
  document.getElementById('addPanel').style.display = 'none';
  updateTblFoot(); toast('"' + n + '" added!');
});
 
function bindRowBtns(row){
  row.querySelector('.edit').addEventListener('click', function(){
    var r = this.closest('tr');
    var n = prompt('Language:', r.cells[0].textContent.trim()); if(n!==null) r.cells[0].textContent = n;
    var c = prompt('Creator:',  r.cells[1].textContent.trim()); if(c!==null) r.cells[1].textContent = c;
    var y = prompt('Year:', r.querySelector('.yr-pill').textContent); if(y!==null) r.querySelector('.yr-pill').textContent = y;
    updateTblFoot(); toast(' Updated');
  });
  row.querySelector('.del').addEventListener('click', function(){
    if (!confirm('Delete this row?')) return;
    this.closest('tr').remove(); updateTblFoot(); toast('🗑 Deleted');
  });
}
document.querySelectorAll('#tblBody tr').forEach(bindRowBtns);
 
function updateTblFoot(){
  var rows = document.querySelectorAll('#tblBody tr');
  if (!rows.length) { document.getElementById('tblFoot').innerHTML = '<span>No data</span>'; return; }
  var yrs = Array.from(rows).map(function(r){ return parseInt(r.querySelector('.yr-pill').textContent); });
  document.getElementById('tblFoot').innerHTML =
    '<span> <strong>'+rows.length+'</strong> languages</span>'+
    '<span> Range: <strong>'+Math.min.apply(null,yrs)+'–'+Math.max.apply(null,yrs)+'</strong></span>'+
    '<span> <strong>'+rows.length+'</strong> creators</span>';
}

document.getElementById('detailBtn').addEventListener('click', function(){
  var p = document.getElementById('detailPanel');
  var open = p.style.display === 'block';
  p.style.display = open ? 'none' : 'block';
  this.textContent = open ? ' Show Course Details' : ' Hide Course Details';
});


var cv='0', ce='', cop=null, cprev=null, cnew=true, chist=[];
 
function cDisp(){
  document.getElementById('cVal').textContent = cv;
  document.getElementById('cExpr').textContent = ce;
}
 
function cNum(n){
  if (cnew) { cv = n==='.'?'0.':n; cnew=false; }
  else {
    if (n==='.' && cv.includes('.')) return;
    cv = (cv==='0' && n!=='.') ? n : cv+n;
  }
  cDisp();
}
 
function cOp(op){
  cprev = parseFloat(cv); cop = op;
  ce = cv + ' ' + {'+':'+','-':'−','*':'×','/':'÷'}[op];
  cnew = true; cDisp();
}
 
function cEq(){
  if (!cop || cprev===null) return;
  var cur = parseFloat(cv), res;
  if (cop==='+') res=cprev+cur;
  else if (cop==='-') res=cprev-cur;
  else if (cop==='*') res=cprev*cur;
  else res = cur===0 ? 'Err' : cprev/cur;
  var out = res==='Err' ? 'Error' : +res.toFixed(10);
  cAddHist(ce+' '+cv+' = '+out);
  cv = res==='Err' ? '0' : String(+res.toFixed(10));
  ce=''; cop=null; cprev=null; cnew=true; cDisp();
}
 
function cClear(){ cv='0'; ce=''; cop=null; cprev=null; cnew=true; cDisp(); }
function cSign(){ cv=String(parseFloat(cv)*-1); cDisp(); }
function cPct(){ cv=String(parseFloat(cv)/100); cDisp(); }
 
function cSci(op){
  var v=parseFloat(cv), res;
  if      (op==='sin')  res=Math.sin(v*Math.PI/180);
  else if (op==='cos')  res=Math.cos(v*Math.PI/180);
  else if (op==='tan')  res=Math.tan(v*Math.PI/180);
  else if (op==='log')  res=v<=0?NaN:Math.log10(v);
  else if (op==='ln')   res=v<=0?NaN:Math.log(v);
  else if (op==='sqrt') res=v<0?NaN:Math.sqrt(v);
  else if (op==='sq')   res=v*v;
  else if (op==='inv')  res=v===0?NaN:1/v;
  else if (op==='abs')  res=Math.abs(v);
  var ok = !isNaN(res) && isFinite(res);
  cAddHist(op+'('+v+') = '+(ok?+res.toFixed(8):'Error'));
  cv = ok ? String(+res.toFixed(8)) : '0';
  cnew=true; cDisp();
}
 
function cAddHist(entry){
  chist.unshift(entry);
  if (chist.length>5) chist.pop();
  var h = document.getElementById('cHist');
  h.innerHTML = '<div class="c-hist-hdr">— History —</div>' +
    chist.map(function(e){ return '<div class="c-hist-row">'+e+'</div>'; }).join('');
}
 

document.getElementById('pStd').addEventListener('click', function(e){
  var btn = e.target.closest('.cbtn'); if (!btn) return;
  if (btn.dataset.n  !== undefined) cNum(btn.dataset.n);
  if (btn.dataset.op !== undefined) cOp(btn.dataset.op);
  if (btn.id==='cBtnC')   cClear();
  if (btn.id==='cBtnSign') cSign();
  if (btn.id==='cBtnPct') cPct();
  if (btn.id==='cBtnEq')  cEq();
});
document.getElementById('pSci').addEventListener('click', function(e){
  var btn = e.target.closest('.cbtn'); if (!btn) return;
  if (btn.dataset.n   !== undefined) cNum(btn.dataset.n);
  if (btn.dataset.op  !== undefined) cOp(btn.dataset.op);
  if (btn.dataset.sci !== undefined) cSci(btn.dataset.sci);
  if (btn.id==='cBtnC2')  cClear();
  if (btn.id==='cBtnEq2') cEq();
});
 

document.addEventListener('keydown', function(e){
  if (!document.getElementById('mCalc').classList.contains('open')) return;
  if ('0123456789.'.includes(e.key)) { cNum(e.key); return; }
  if (['+','-','*','/'].includes(e.key)) { cOp(e.key); return; }
  if (e.key==='Enter' || e.key==='=') { cEq(); return; }
  if (e.key==='Backspace') { cv=cv.length>1?cv.slice(0,-1):'0'; cDisp(); return; }
  if (e.key.toLowerCase()==='c') cClear();
});
 

function setCalcMode(m){
  ['Std','Sci','Conv'].forEach(function(x){
    document.getElementById('m'+x).classList.toggle('on', x.toLowerCase()===m);
  });
  document.getElementById('pStd').className  = 'calc-panel' + (m!=='std' ?' off':'');
  document.getElementById('pSci').className  = 'calc-panel' + (m!=='sci' ?' off':'');
  document.getElementById('pConv').style.display = m==='conv'?'block':'none';
}
document.getElementById('mStd').addEventListener('click',  function(){ setCalcMode('std');  });
document.getElementById('mSci').addEventListener('click',  function(){ setCalcMode('sci');  });
document.getElementById('mConv').addEventListener('click', function(){ setCalcMode('conv'); });
 

var CD = {
  length: {u:['Meter','Kilometer','Mile','Foot','Inch','Centimeter','Yard'],     b:{Meter:1,Kilometer:1000,Mile:1609.34,Foot:.3048,Inch:.0254,Centimeter:.01,Yard:.9144}},
  weight: {u:['Kilogram','Gram','Pound','Ounce','Tonne'],                        b:{Kilogram:1,Gram:.001,Pound:.453592,Ounce:.0283495,Tonne:1000}},
  temp:   {u:['Celsius','Fahrenheit','Kelvin'],                                  b:null},
  speed:  {u:['m/s','km/h','mph','knot'],                                        b:{'m/s':1,'km/h':.277778,mph:.44704,knot:.514444}}
};
 
function convUnits(){
  var cat = document.getElementById('convCat').value;
  var us  = CD[cat].u;
  ['convFrom','convTo'].forEach(function(id,i){
    document.getElementById(id).innerHTML = us.map(function(u,j){
      return '<option value="'+u+'"'+(i===0&&j===0||i===1&&j===1?' selected':'')+'>'+u+'</option>';
    }).join('');
  });
  convCalc();
}
 
function convCalc(){
  var cat  = document.getElementById('convCat').value;
  var from = document.getElementById('convFrom').value;
  var to   = document.getElementById('convTo').value;
  var v    = parseFloat(document.getElementById('convIn').value);
  if (isNaN(v)) { document.getElementById('convOut').textContent='—'; return; }
  var res;
  if (cat==='temp'){
    var c = from==='Fahrenheit'?(v-32)*5/9 : from==='Kelvin'?v-273.15 : v;
    res = to==='Fahrenheit'?c*9/5+32 : to==='Kelvin'?c+273.15 : c;
  } else {
    res = v * CD[cat].b[from] / CD[cat].b[to];
  }
  document.getElementById('convOut').textContent = +res.toFixed(6)+' '+to;
}
 
document.getElementById('convCat').addEventListener('change', convUnits);
document.getElementById('convFrom').addEventListener('change', convCalc);
document.getElementById('convTo').addEventListener('change', convCalc);
document.getElementById('convIn').addEventListener('input', convCalc);
document.getElementById('convSwapBtn').addEventListener('click', function(){
  var f=document.getElementById('convFrom').value, t=document.getElementById('convTo').value;
  document.getElementById('convFrom').value=t;
  document.getElementById('convTo').value=f;
  convCalc();
});
convUnits();


document.getElementById('xTic').addEventListener('click', function(){ closeModal('mTic'); });
document.getElementById('mTic').addEventListener('click', function(e){ if(e.target===this) closeModal('mTic'); });
document.getElementById('rowTic').addEventListener('click', function(){ closeModal('mProj'); openModal('mTic'); ticReset(); });

var ticBoard   = ['','','','','','','','',''];
var ticCurrent = 'X';
var ticOver    = false;
var ticScores  = { X:0, O:0, D:0 };

var ticWins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]           
];

function ticRender(){
  document.querySelectorAll('.tic-cell').forEach(function(cell){
    var i   = parseInt(cell.getAttribute('data-i'));
    var val = ticBoard[i];
    cell.textContent = val === 'X' ? '✕' : val === 'O' ? '○' : '';
    cell.className = 'tic-cell' + (val ? ' '+val.toLowerCase()+' taken' : '');
  });
}

function ticCheckWin(){
  for(var w=0; w<ticWins.length; w++){
    var a=ticWins[w][0], b=ticWins[w][1], c=ticWins[w][2];
    if(ticBoard[a] && ticBoard[a]===ticBoard[b] && ticBoard[a]===ticBoard[c]){
      return ticWins[w];
    }
  }
  return null;
}

function ticSetStatus(msg, color){
  var s = document.getElementById('ticStatus');
  s.textContent = msg;
  s.style.color = color || 'var(--text)';
}

function ticUpdateScores(){
  document.getElementById('scoreX').textContent = ticScores.X;
  document.getElementById('scoreO').textContent = ticScores.O;
  document.getElementById('scoreD').textContent = ticScores.D;
}

document.getElementById('ticBoard').addEventListener('click', function(e){
  var cell = e.target.closest('.tic-cell');
  if(!cell || ticOver) return;
  var i = parseInt(cell.getAttribute('data-i'));
  if(ticBoard[i]) return;

  ticBoard[i] = ticCurrent;
  ticRender();

  var win = ticCheckWin();
  if(win){
    
    win.forEach(function(idx){
      document.querySelector('.tic-cell[data-i="'+idx+'"]').classList.add('win');
    });
    ticScores[ticCurrent]++;
    ticUpdateScores();
    ticSetStatus(
      '🏆 PLAYER ' + ticCurrent + ' WINS!',
      ticCurrent==='X' ? 'var(--accent)' : 'var(--accent2)'
    );
    ticOver = true;
    return;
  }

  if(ticBoard.every(function(v){ return v !== ''; })){
    ticScores.D++;
    ticUpdateScores();
    ticSetStatus(' DRAW!', 'var(--gold)');
    ticOver = true;
    return;
  }

  ticCurrent = ticCurrent==='X' ? 'O' : 'X';
  ticSetStatus(
    '✦ PLAYER ' + ticCurrent + '\'s TURN',
    ticCurrent==='X' ? 'var(--accent)' : 'var(--accent2)'
  );
});

function ticReset(){
  ticBoard   = ['','','','','','','','',''];
  ticCurrent = 'X';
  ticOver    = false;
  ticRender();
  ticSetStatus('✦ PLAYER X\'s TURN', 'var(--accent)');
}

document.getElementById('ticReset').addEventListener('click', ticReset);
document.getElementById('ticResetAll').addEventListener('click', function(){
  ticScores = {X:0, O:0, D:0};
  ticUpdateScores();
  ticReset();
});

const text = "Suhaib Al - Rawashdeh";
const nameElement = document.getElementById("name");

nameElement.textContent = "";

let index = 0;

function typeName(){
  if(index < text.length){
    nameElement.textContent += text[index];
    index++;
    setTimeout(typeName, 120);
  }
}

window.onload = typeName;