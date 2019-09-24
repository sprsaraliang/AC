
/*20190917_S6_U76_物件：一組完整的概念_小練習：幫遊戲角色補血*/

const player = {
  hp: 20,
  mp: 100,
  addHP: function (point) {
  	const mpExpend=point*2;
    if ( this.mp > mpExpend ) {
     this.hp += point;
	 this.mp -= mpExpend;
     console.log("HP recovered!");
    } else {
     console.log("You don't have enough mp!");
    }
	return this
  }
}

console.log(player.addHP(30));
console.log(player.addHP(30));