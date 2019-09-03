let answer; //正確答案
let answerInput; //關主輸入值
let autoGuess; //亂數
let answerTimes = 0; //關主輸入值

function issue() {
	answerInput = prompt("請輸入您要讓電腦猜的數字，限制1~100以內", "101");

	while (!(answerInput >= 1 && answerInput <= 100)) { //如果輸入正確的1~100則電腦開始猜正確答案
		answerInput = prompt("請輸入您要讓電腦猜的數字，限制1~100以內", "");
	}

	answer = answerInput;
	alert("您的數字正確，電腦要開始猜題!");
	console.log("您設定的正確答案:【" + answer + "】電腦要來猜題!!!!!");
}


function randomNum() { //亂數
	autoGuess = Math.floor(Math.random() * 100) + 1;
}

function computerGuess(answer) { //電腦猜題直至猜對
	while (autoGuess) {
		answerTimes++;
		if (answer > autoGuess) {
			console.log("電腦猜測數字:第" + answerTimes + "次猜測，【" + autoGuess + "】，數值太小，猜測失敗，再猜一次!"); //電腦猜不中就重來
		} else if (answer < autoGuess) {
			console.log("電腦猜測數字:第" + answerTimes + "次猜測，【" + autoGuess + "】，數值太大，猜測失敗，再猜一次!"); //電腦猜不中就重來
		} else {
			console.log("電腦猜測數字:第" + answerTimes + "次猜測，【" + autoGuess + "】電腦終於猜對了!!!!!");
			break;
		}
		randomNum();
	}
}


issue(); //詢問關主答案
randomNum(); //賦予第一個亂數值
computerGuess(answer); //開始猜題