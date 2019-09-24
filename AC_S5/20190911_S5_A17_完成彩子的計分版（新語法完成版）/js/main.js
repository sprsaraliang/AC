let players = [{
		name: '櫻木花道',
		pts: 0,
		reb: 0,
		ast: 0,
		stl: 0,
		blk: 2
	},
	{
		name: '流川楓',
		pts: 30,
		reb: 6,
		ast: 3,
		stl: 3,
		blk: 0
	},
	{
		name: '赤木剛憲',
		pts: 16,
		reb: 10,
		ast: 0,
		stl: 0,
		blk: 5
	},
	{
		name: '宮城良田',
		pts: 6,
		reb: 0,
		ast: 7,
		stl: 6,
		blk: 0
	},
	{
		name: '三井壽',
		pts: 21,
		reb: 4,
		ast: 3,
		stl: 0,
		blk: 0
	}
]

const dataPanel = document.querySelector('#data-panel')

// write your code here

var len = Object.keys(players).length; //物件的筆數
var p_name = '';
var p_pts = '';
var p_reb = '';
var p_ast = '';
var p_stl = '';
var p_blk = '';
var p_content = '';
var p_id = 0;

function displayPlayerList() {
	var content = '';

	for (var i = 0; i < len; i++) {
		p_id++;
		p_name = players[i].name;
		p_pts = players[i].pts;
		p_reb = players[i].reb;
		p_ast = players[i].ast;
		p_stl = players[i].stl;
		p_blk = players[i].blk;
		getHtml();
	}
	document.getElementById("data-panel").innerHTML = p_content;
}

/*Html語法產生區*/
const icon_html = '<i class="fas fa-plus-circle" name="up"></i><i class="fas fa-minus-circle" name="Down"></i>'

function getHtml() {
	p_content += '<tr>' +
		'<th>' + p_name + '</th>' +
		'<th>' + p_pts + icon_html + '</th>' +
		'<th>' + p_reb + icon_html + '</th>' +
		'<th>' + p_ast + icon_html + '</th>' +
		'<th>' + p_stl + icon_html + '</th>' +
		'<th>' + p_blk + icon_html + '</th>' +
		'</tr>';
}


dataPanel.addEventListener('click', voteUp);

function voteUp(event) {
	const th_vote = event.target.parentElement;


	console.log("tagName：" + th_vote.tagName);

	if (th_vote.tagName == 'TH' && event.target.classList.contains('fa-plus-circle')) {
		
		v = parseInt(th_vote.textContent) + 1;
		th_vote.innerHTML = v + icon_html;

	} else if (th_vote.tagName == 'TH' && event.target.classList.contains('fa-minus-circle')) {

		v = parseInt(th_vote.textContent) - 1;
		if (v >= 0) {
			th_vote.innerHTML = v + icon_html;
		} else {
			th_vote.innerHTML = "0" + icon_html;
		}

	}


}

displayPlayerList();

