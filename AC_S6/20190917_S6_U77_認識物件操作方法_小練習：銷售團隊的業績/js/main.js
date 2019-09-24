
/*20190917_S6_U77_認識物件操作方法_小練習：銷售團隊的業績*/

let performance = {
  mike: 200,
  bernard: 500,
  cathy: undefined,
  jane: 300
}

let sum = 0
// write your code here

function total(){
    let ids = Object.keys(performance);
    for(let i=0;i<ids.length;i++){
        let val = performance[ids[i]];
        if(val != undefined)
            sum += val;
    }
    console.log(sum);
}

// Here is model answer:標準答案
/*
let sum = 0
for (let person in performance) {
  if (typeof performance[person] === 'number') {
  sum += performance[person]
  }
}
*/
total()
/// ////// System code; don't change //////////
sum

