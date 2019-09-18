
/*20190917_S6_A22 週年慶摸彩活動 - 陣列方法篇*/
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

/*假設在第一次抽獎時，我們從摸彩箱裡抽出了位於 players[5] 的 Ellen，
做為第一號幸運得主，請問以下哪些表達式，會改變 players 的內容，
讓 players 只剩下「還沒得獎的其他 9 個人」？*/
//players.splice(5, 1);


/*承上題，如果這不是摸彩活動，而是「限定名額的兌換獎品」，
最前三名登錄的人可以獲得精美紀念品。
以下哪些程式碼會回傳前三名得主 (也就是 Bernard, Youchi, Yenting)？*/
//players.slice(0, 3);

/*假設在抽出一些幸運得主之後，
剩下在 players 裡的人還沒有得獎，我們為他們準備了參加獎，
只要到服務台報出號碼，就能直接領取。
*/

//players.map(function (c) { return c.ticket })
//players.map(c => c.ticket)
//players.map((c) => { return c.ticket })
