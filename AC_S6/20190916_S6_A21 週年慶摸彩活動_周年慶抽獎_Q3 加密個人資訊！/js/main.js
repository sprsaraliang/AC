
/*20190916_S6_A21 週年慶摸彩活動_周年慶抽獎_Q3 加密個人資訊！*/

const players = [
  { name: 'Bernard', email: 'bernard@example.com', ticket: 'XL3558' },
  { name: 'Youchi', email: 'youchi@example.com', ticket: 'AH9188' },
  { name: 'Yenting', email: 'yenting@example.com', ticket: 'LO9903' },
  { name: 'Angela', email: 'angela@example.com', ticket: 'HY7212' },
  { name: 'Yvonne', email: 'yvonne@example.com', ticket: 'CH7684' },
  { name: 'Ellen', email: 'ellen@example.com', ticket: 'BB1750' },
  { name: 'Walter', email: 'walter@example.com', ticket: 'EI5724' },
  { name: 'Kevin', email: 'kevin@example.com', ticket: 'TT1804' },
  { name: 'Tim', email: 'tim@example.com', ticket: 'CK4592' },
  { name: 'Russell', email: 'russell@example.com', ticket: 'SI0305' }
]

const winnerArray = [];

let playersLength = Object.keys(players).length -1; //陣列物件最高值
let winnerNum=Math.round(Math.random() *  playersLength);

function drawWinner() {

    while(winnerArray.length<6){
  	  winnerNum=Math.round(Math.random()*playersLength);
  	  console.log("系統抽出序號："+winnerNum);
  	  checkWinner();
    }


    let winners ;
    for(var i=0;i<winnerArray.length;i++){
    	//winners= players[i].ticket + " | " + players[i].name + " | " + players[i].email;
      winners= players[i].ticket + " | " + encodeName(players[i].name) + " | "+ encodeEmail(players[i].email)
    	console.log("第"+(i+1)+"個得獎人: " + winners ); 
    }

}


function checkWinner(){
    let duplicated =false;

    for (var i=0;i < winnerArray.length;i++) {
  	  if (winnerNum == winnerArray[i]){
  		duplicated=true;
  		console.log("系統發現重複，需要重抽");
  	  }
    }

    if (!duplicated){
       	winnerArray.push(winnerNum); //沒有重複就新增在winnnerNum
       	console.log("系統確認可以序號不重複，納入中獎清單");
    }

 }

drawWinner();

function encodeName(name){
let starLength=name.length -2 ;
let star="";
 for (var i=0; i <starLength; i++) {
   star+="*";
 }
let encodeName= name.substr(0, 2)+star ;
//console.log(name.substr(0, 2));
 return encodeName;
}

function encodeEmail(email){
 let atIndex = email.indexOf("@");
 let encodeEmail;
 let plainTxt = email.substr(0,(atIndex));
 let starLength=Math.floor(plainTxt.length/2); 
 let star="...";
 let emailTxt= email.substr(0,(starLength));
// console.log("plainTxt："+plainTxt);
// console.log("encodeLength："+starLength);
// console.log("emailTxt："+emailTxt);
   encodeEmail= emailTxt+star+email.substr(atIndex);
   return encodeEmail;
}