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

var sty = document.createElement("style");
sty.id = "myStyle";
sty.type = 'text/css';
sty.textContent = 'td {width: 20px; } td.c0 { background-color: #ff8888; } td.c1 { background-color: #88ff88; } td.c2 { background-color: #8888ff; } td.c3 { background-color: #cccc88; }';

var par = document.getElementById('tab');
document.head.appendChild(sty);


var inp = document.createElement('input');
inp.id = 'offset';
inp.onchange = function(e) {
    var num = parseInt(e.target.value);
    getChunk(num,10000);
}
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
}
par.appendChild(inp);

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

function getChunk(start,len) {
    var rawFile = new XMLHttpRequest();

    var myreturn="";
    rawFile.open("GET", 'rando.txt', true); 
    rawFile.setRequestHeader('Accept','text/plain');
    rawFile.setRequestHeader('Range', 'bytes=' + start + '-' + (start + len));
    rawFile.responseType = 'text';
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 206 ) //|| rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                randy=allText;
                showStuff(0);
            }
        }
    }
   rawFile.send(null);
}

function checkUrl(url) {
    var request = false;
    if (window.XMLHttpRequest) {
            request = new XMLHttpRequest;
    } else if (window.ActiveXObject) {
            request = new ActiveXObject("Microsoft.XMLHttp");
    }

    if (request) {
            request.open("GET", url);
            if (request.status == 200) { return true; }
    }

    return false;
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

function getit() {
    oonsole.log("doing it");
    //var myUrl = "https://chex.2id.us";
    var myUrl = "https://www.random.org/integers/?num=20&min=0&max=268435455&col=1&base=16&format=plain&rnd=new";
    GM_xmlhttpRequest({
        method: "GET",
        url: myUrl,
        onload: function(response) {
            console.log(response.responseText);
            //alert(response.responseText);
        }
    });
    console.log("done it?");
}

function bits2Float32(bytes,exp) {
 //       console.log(bytes,exp);
    return bytes / ( 1 << exp );
}

