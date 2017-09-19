var myhead = document.getElementById('myh1');

var styleEle = document.createElement('style');
styleEle.type = 'text/css';
styleEle.id = "main-style-css";
styleEle.textContent = 'h1 { text-align: center; font-size: 80px; } ';
styleEle.textContent += 'h1#myh1 { color: #222222; z-index: -1;} ';
styleEle.textContent += 'h1#myh2 { color: #999999; z-index: 0;} ';
styleEle.textContent += 'h1#myh3 { color: #ffffff; z-index: 1;} ';
styleEle.textContent = styleEle.textContent + '';
document.head.appendChild(styleEle);


//length of time in ms between changes
var sleepytime=3000;

var blocks=10;
var steps=24;

var first=0;
var second=18;
var third=51;
var fourth=84;
var fifth=101;
var blah=readTextFile("failgracefully.txt");
var textByLine = blah.split("\n");
var last=textByLine.length - 1;

var index=1;
var myh1 = document.createElement('h1');
myh1.id='myh1';
var myh2 = document.createElement('h1');
myh2.id='myh2';
var myh3 = document.createElement('h1');
myh3.id='myh3';
mydocument.appendchild(myh1);
mydocument.appendchild(myh2);
mydocument.appendchild(myh3);
var myhead = document.getElementById('myh1');
myh1.innerHTML="<pre>" + textByLine[0] + "</pre>";
myh3.innerHTML="<pre>" + textByLine[0] + "</pre>";
var interval = setInterval(setH1, sleepytime);

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var myreturn="";
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                myreturn=allText;
            }
        }
    }
   rawFile.send(null);
   return myreturn;
}

function getRandomArbitrary(min, max) {
  var returnz= Math.round(Math.random() * (max - min) + min);
//  console.log("random = " + returnz);
  return returnz;
}

function setH1() {
  if ( index > steps) {
 //    console.log("rollover");
     index=0;
  }
  if ( index == 0 ) {
    rand=first;
  }
  else if ( index < steps ) {
    start=Math.round((index - 1 ) * (textByLine.length ) / steps);
    console.log(start, start + blocks, index, textByLine.length, steps);
    rand=getRandomArbitrary(start, start + blocks);
  }
  else {
    rand=last;
  }
  console.log(rand);
  var myoldhead = document.getElementById('myh2');
  var myhead = document.getElementById('myh3');
  myoldhead.innerHTML = myhead.innerHTML;
  myhead.innerHTML="<pre>" + textByLine[rand] + "</pre>";
  index=index + 1
}
