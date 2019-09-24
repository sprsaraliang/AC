
/*分別、獨立產生六個字符
前兩個字符為大寫英文字母
後四個字符為數字*/

function generateTicket(){
  let ticket='';
  const letters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let maxNum = 9999;
  let minNum = 1000;

	for (var i = 0; i < 6; i++) {
		ticket += letters.charAt(Math.floor(Math.random() *6))
	}
	ticket += Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
	console.log(ticket);
	return(ticket);
}



generateTicket();
generateTicket();
generateTicket();
generateTicket();
generateTicket();
generateTicket();