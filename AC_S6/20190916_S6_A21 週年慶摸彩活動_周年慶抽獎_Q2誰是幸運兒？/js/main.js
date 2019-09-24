
/*20190916_S6_A21 週年慶摸彩活動_周年慶抽獎*/

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

let playersLength = Object.keys(players).length -1;
let winnerNum=Math.floor(Math.random() *  playersLength)  + 0;

function drawWinner() {

  while(winnerArray.length<6){
	  winnerNum=Math.floor(Math.random()*playersLength)+0;
	  console.log("系統抽出序號："+winnerNum);
	  checkWinner();
  }


  let winners ;
  for(var i=0;i<winnerArray.length;i++){
  	winners= players[i].ticket + " | " + players[i].name + " | " + players[i].email;
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

  if (duplicated==false){
     	winnerArray.push(winnerNum); //沒有重複就新增在winnnerNum
     	console.log("系統確認可以序號不重複，納入中獎清單");
  }

 }

drawWinner();