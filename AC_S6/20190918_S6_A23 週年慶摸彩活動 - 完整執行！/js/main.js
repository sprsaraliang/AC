/*20190918_S6_A23 週年慶摸彩活動 - 完整執行！JS*/

// DATA /////////////////////////////////////

let players = [
  { name: 'Bernard', email: 'bernard@example.com' },
  { name: 'Youchi', email: 'youchi@example.com' },
  { name: 'Yenting', email: 'yenting@example.com' },
  { name: 'Angela', email: 'angela@example.com' },
  { name: 'Yvonne', email: 'yvonne@example.com' },
  { name: 'Ellen', email: 'ellen@example.com' },
  { name: 'Walter', email: 'walter@example.com' },
  { name: 'Kevin', email: 'kevin@example.com' },
  { name: 'Tim', email: 'tim@example.com' },
  { name: 'Russell', email: 'russell@example.com' }
]


// add more functions here

// EXECUTING /////////////////////////////////////

// each player gets a lottery ticket

const playerLength = players.length; //物件內的陣列最高值
let award = new Array(playerLength); //得獎資料
ticket(); //分配發出抽獎券號
lottery(); //抽出獎項


function joinLottery(idx) {
  let awardNum = Math.round(Math.random() * (award.length-1)); 
  players[idx].award = award[awardNum]; 
  award.splice(awardNum, 1)
}

function ticket() { //發出樂透券
 // console.log("執行ticket()，為每一個參加者發出樂透券");

  for (let i in players ) {
    joinTicket(i)
  }

  //console.log(players);
}

function lottery() { //分配獎項
 // console.log("執行lottery()，開始抽獎");
  initLottery(award);
  for (let idx in players) {
    joinLottery(idx);
  }
 // console.log(players);
}

function initLottery(award) {
  for(var i=0;i<award.length;i++){
    if(i==0) award[i]="頭獎";
    else if(i==1) award[i]="貮獎";
    else if(i==2) award[i]="叁獎";
    else award[i]="參加獎";
  }
 // console.log(award);
}


function drawWinner(players, prize) {
  
  for(var i=0;i<players.length;i++){
    if(players[i].award===prize)
      announceMsg(players[i],prize);
  }

}

function announceMsg (winner, prize) {
  console.log(`${winner.number} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)} | ${prize}`)
}


// write your code here
// draw 3 winners and announce the results
drawWinner(players, '頭獎');
drawWinner(players, '貮獎');
drawWinner(players, '叁獎');
drawWinner(players, '參加獎');
// the rest of players get participation award
// write your code here




function joinTicket(i) {
  let ticket_num = random_ticket();

 // console.log("初始產生號碼：" + ticket_num + "  給  " + players[i].name.toString());
  
  while (checkDuplicated(ticket_num)) {
    ticket_num = random_ticket();
 //   console.log("因重複random()重新產生號碼：" + ticket_num + "  給  " + players[i].name.toString());
  }

  players[i].number = ticket_num;

}



function checkDuplicated(ticket_num){
  for(let i=0;i<players.length;i++){
    let player = players[i];
    if(player.ticket === ticket_num)
      return true;
  }
  return false;
}


function random_ticket() {
  let ticket = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (var i = 0; i < 2; i++) { //正確是i<2
    ticket += letters.charAt(Math.round(Math.random() * 25)) //共有26個字母，0~25
  }
  for (var i = 0; i < 4; i++) { //正確是i<2
    ticket += Math.round(Math.random() * 9); //共有4個數字
  }
  return ticket;
}


/*以下為加密的function*/
function encodeName(name) {
  let starLength = name.length - 2;
  let star = "";
  for (var i = 0; i < starLength; i++) {
    star += "*";
  }
  let encodeName = name.substr(0, 2) + star;
  return encodeName;
}

function encodeEmail(email) {
  let atIndex = email.indexOf("@");
  let encodeEmail;
  let plainTxt = email.substr(0, (atIndex));
  let starLength = Math.floor(plainTxt.length / 2);
  let star = "...";
  let emailTxt = email.substr(0, (starLength));
  encodeEmail = emailTxt + star + email.substr(atIndex);
  return encodeEmail;
}