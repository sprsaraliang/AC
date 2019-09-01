
var answer ;//正確答案
var answerInput ;//關主輸入值

function issue(){
	answerInput= prompt("請輸入您要讓電腦猜的數字，限制1~100以內","2");
	while(!(answerInput >= 1 && answerInput <=100)){//如果輸入正確的1~100則電腦開始猜正確答案
		answerInput= prompt("請輸入您要讓電腦猜的數字，限制1~100以內","");
	}

    answer=answerInput;  
    alert("您的數字正確，電腦要開始猜題!"); 
    console.log("正確答案:【"+answer+"】電腦要來猜題!!!!!");
    computerGuess(answer);

}

function  computerGuess(answer){//電腦猜題
	var autoGuess=Math.floor(Math.random()*100)+1;

	while (answer!=autoGuess)
	{
		autoGuess=Math.floor(Math.random()*100)+1;
		if (answer>autoGuess) {
			console.log("電腦猜測數字:【"+autoGuess+"】，數值太小，猜測失敗，再猜一次!");//電腦猜不中就重來
		}else if(answer<autoGuess) {
			console.log("電腦猜測數字:【"+autoGuess+"】，數值太大，猜測失敗，再猜一次!");//電腦猜不中就重來
		}

		
	}
	
	console.log("電腦猜測數字:【"+autoGuess+"】電腦終於猜對了!!!!!");
}


issue();