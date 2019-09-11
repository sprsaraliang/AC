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
    blk: 0,
  },
  {
    name: '大麥克',
    pts: 12,
    reb: 3,
    ast: 5,
    stl: 1,
    blk: 1
  }
];

//const dataPanel = document.querySelector('#data-panel');

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

function getHtml() {


   p_content += '<tr>' +
    '<th>' + p_name  + '</th>'+
    '<th><span id=pts_'+ p_id + '>' +  p_pts +'</span>'+  
    '<a onclick="voteUp(\'pts_'+ p_id +'\')"><i class="fas fa-plus-circle"></i> </a>'+
    '<a onclick="voteDown(\'pts_'+ p_id+'\')"><i class="fas fa-minus-circle"></i> </a>'+'</th>' +
   
    '<th><span id=reb_'+ p_id + '>' +  p_reb +'</span>'+
    '<a   onclick="voteUp(\'reb_'+ p_id+'\')"><i class="fas fa-plus-circle"></i> </a>'+
    '<a onclick="voteDown(\'reb_'+ p_id+'\')"><i class="fas fa-minus-circle"></i> </a>'+'</th>' +


    '<th><span id=ast_'+ p_id + '>' +  p_ast +'</span>'+
    '<a   onclick="voteUp(\'ast_'+ p_id+'\')"><i class="fas fa-plus-circle"></i> </a>'+
    '<a onclick="voteDown(\'ast_'+ p_id+'\')"><i class="fas fa-minus-circle"></i> </a>'+'</th>' +


    '<th><span id=stl_'+ p_id + '>' +  p_stl +'</span>'+
    '<a   onclick="voteUp(\'stl_'+ p_id+'\')"><i class="fas fa-plus-circle"></i> </a>'+
    '<a onclick="voteDown(\'stl_'+ p_id+'\')"><i class="fas fa-minus-circle"></i> </a>'+'</th>' +

    '<th><span id=blk_'+ p_id + '>' +  p_blk +'</span>'+
    '<a   onclick="voteUp(\'blk_'+ p_id+'\')"><i class="fas fa-plus-circle"></i> </a>'+
    '<a onclick="voteDown(\'blk_'+ p_id+'\')"><i class="fas fa-minus-circle"></i> </a>'+'</th>' +
    '</tr>';
}

function voteUp(id) {
  console.log("id:"+id);
  var point = parseInt($("#"+id).text())+1;
  $("#"+id).text(point);
};

function voteDown(id) {
  console.log("id:"+id);
  var point =parseInt( $("#"+id).text())-1;
  if ( point <= 0){
    $("#"+id).text(0);
  }else {
  $("#"+id).text(point);
  }
};


displayPlayerList();