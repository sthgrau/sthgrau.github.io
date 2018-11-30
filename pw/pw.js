'use strict';

var rowData = [[0,3,2,3,2,1,0,1,0,3,2,3,2,1,0,1],
[3,0,1,0,1,2,3,2,3,0,1,0,1,2,3,2],
[1,2,3,2,3,0,1,0,1,2,3,2,3,0,1,0],
[2,1,0,1,0,3,2,3,2,1,0,1,0,3,2,3]];

var rands = '12345678abcdefghijkmnoprstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ@#$%^&+?';
var ns = [];
var ls = [];
var Ls = [];
var ss = [];
var randy = '';
var num = -1;

if ( document.URL.match(/id=[0-9]+/) ) {
    num = parseInt(document.URL.split("?")[1].match(/id=[0-9]*/)[0].split("=")[1]);
}

var sc = document.createElement('script');
sc.type = 'application/javascript';
sc.src = 'https://cdn.rawgit.com/davidshimjs/qrcodejs/master/qrcode.min.js';
sc.onload = function() { if ( num > -1 ) { doqrcode(num); }};
document.head.appendChild(sc);

var sty = document.createElement("style");
sty.id = "myStyle";
sty.type = 'text/css';
sty.textContent = 'td {width: 18; text-align: center;} td.c0 { background-color: #ff8888; } td.c1 { background-color: #88ff88; } td.c2 { background-color: #8888ff; } td.c3 { background-color: #cccc88; } ';
sty.textContent += 'td[id$="_8"] { border-left: solid black; } ';
sty.textContent += 'td[id^="data_8"] { border-top: solid black; } ';
sty.textContent += 'td[id$="_4"],td[id$="_12"] { border-left: solid DodgerBlue  ; } ';
sty.textContent += 'td[id^="data_4"],td[id^="data_12"] { border-top: solid DodgerBlue  ; } ';
sty.textContent += 'td[id$="_2"],td[id$="_6"],td[id$="_10"],td[id$="_14"] { border-left: solid red; } ';
sty.textContent += 'td[id^="data_2"],td[id^="data_6"],td[id^="data_10"],td[id^="data_14"] { border-top: solid red; } ';
//sty.textContent += 'div > label { position: absolute;} input:valid { background: white; }';

var par = document.getElementById('tab');
document.head.appendChild(sty);

var inpdiv = document.createElement('div');

var inp = document.createElement('input');
inp.id = 'offset';
inp.type = 'number';
inp.alt = 'Enter an offset';
inp.onchange = function(e) {
    var num = parseInt(e.target.value);
    getChunk(num);
}

var lab = document.createElement('label');
lab.id = 'offlab';
lab.for = 'offset';
lab.innerText = 'Offset: ';

function showStuff(num) {
    var tn = num;
    var dd = randy.slice(num);
    for ( var i = 0; i < 64; i++ ) {
        var n = dd.slice(tn,tn+3);
        tn += 3;
        var ti = Math.round(bits2Float32(parseInt(n,2),3)*8);
        ns.push(rands[Math.round(bits2Float32(parseInt(n,2),3)*8)]);
        var l = dd.slice(tn,tn+5);
        tn += 5;
        ls.push(rands[8+Math.round(bits2Float32(parseInt(l,2),5)*24)]);
        var L = dd.slice(tn,tn+5);
        tn += 5;
        Ls.push(rands[32+Math.round(bits2Float32(parseInt(L,2),5)*24)]);
        var s = dd.slice(tn,tn+3);
        tn += 3;
        ss.push(rands[56+Math.round(bits2Float32(parseInt(n,2),3)*8)]);
    }
    for ( var rr = 0; rr < 16; rr++ ) {
        for ( var cc = 0; cc < 16; cc++ ) {
            var val;
            if ( rowData[rr % 4][cc] == "0" ) {
                val = ns.pop();
            }
            else if ( rowData[rr % 4][cc] == "1" ) {
                val = ls.pop();
            }
            else if ( rowData[rr % 4][cc] == "2" ) {
                val = Ls.pop();
            }
            else if ( rowData[rr % 4][cc] == "3" ) {
                val = ss.pop();
            }
            var f = par.getElementsByTagName('td')["data_" + rr + "_" + cc];
            f.innerText = val;
        }
    }
    console.log("num=",num);
    if ( typeof(QRCode) == "function" ) {
        doqrcode(num);
    }
}
par.appendChild(inpdiv);
inpdiv.appendChild(lab);
inpdiv.appendChild(inp);

if ( num > -1 ) {
    inp.value = num;
    getChunk(num);
}

var but = document.createElement('but');
but.innerText = "Doit";
but.onclick = function() {
    getit();
}
//    par.appendChild(but);

var ta = document.createElement('table');
for ( var r = 0; r < 16; r++ ) {
    var mr = document.createElement('tr');
    mr.id = 'row_' + r;
    for ( var c = 0; c < 16; c++ ) {
        var mc = document.createElement('td');
        mc.id = 'data_' + r + '_' + c;
   //     mc.className = 'c' + ( 2 * r + c + Math.round(r / 2) % 2 ) % 4;
        mc.className = 'c' + ( 2 * r + c ) % 4;
        mc.innerText = rowData[r % 4][c];
        mr.appendChild(mc);
    }
    ta.appendChild(mr);
}
par.appendChild(ta);

function getChunk(num) {
    var rawFile = new XMLHttpRequest();

    var myreturn="";
    rawFile.open("GET", 'rando.txt', true); 
    rawFile.setRequestHeader('Accept','text/plain');
    rawFile.setRequestHeader('Range', 'bytes=0-' + (10000 + num));
    rawFile.responseType = 'text';
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 206 ) //|| rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                randy=allText.split("").reverse().join("");
                showStuff(num);
            }
        }
    }
   rawFile.send(null);
}

function doqrcode(num) {
    var anc = document.getElementById("linky");
    var url = document.URL.split("?")[0] + "?id=" + num;
    anc.href=url;
    var md = document.getElementById("qrcode");
    if ( md.childNodes.length > 0 ) {
        md.childNodes[0].remove();
        md.childNodes[0].remove();
    }
    new QRCode(document.getElementById("qrcode"), url);
}

function doit() {
    let p1 = new Promise((resolve, reject) => {
        this.pieceImg = new Image();
        this.pieceImg.src = "images/chexpieces.png";
        this.pieceImg.onload = function () {
            resolve(this);
        };
    })
    Promise.all([p1,p2]).then((value) => {
        consolelog("apres p1");
        //after promise returns
        this.afterPro(value)
    }).catch((reason) => {
        consolelog('Handle rejected promise (' + reason + ') here.');
    })
}

function bits2Float32(bytes,exp) {
 //       console.log(bytes,exp);
    return bytes / ( 1 << exp );
}

