
var ball = document.querySelector('.table');
var tb_cell;
var content;
var niceCode ='<i class="fa fa-thumbs-up"></i>'

for (var i=1;i<ball.rows.length; i++)
{
   for (var j=1; j<ball.rows[i].cells.length; j++){
   	tb_cell=ball.rows[i].cells[j];
   	content=tb_cell.innerText;
   	add_niceIcon();
   }
}

function add_niceIcon() {
	if(content>=20){
  	tb_cell.innerHTML = tb_cell.innerHTML+niceCode;
	console.log(tb_cell.innerHTML);
	}
}