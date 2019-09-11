
document.querySelector('.my-name').textContent="Mary Chen";
document.querySelector('.info').textContent="巴菲特說過「人生中沒有哪一項投資會比投資自己更划算」，透過創業找到生命方向，再透過學習和服務投資自己，給自己磨練的機會，從中得到歷練與成長能量，在逆境中更要帶頭去做中學、學中做，不停的創新，修正方向去超越對手，才能成就自己，寫下不一樣的故事。";
document.querySelector('.rounded').src="http://via.placeholder.com/200/B88E8D/FFFFFF/"

var ul = document.querySelector('.list-unstyled');
var li_list=["創業者","人生夢想實現家","天使投資者","個人傳記創立者"];

for (var i = 0; i < li_list.length; i++) {
	var li = document.createElement("li");
　　li.textContent=li_list[i];
　　ul.appendChild(li);
}
