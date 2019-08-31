
// picture object
var pic=[1015,1025,1027,152,159];


function createPic(idx){
  return {
  numVotes: 0,
  mediaURL: "https://picsum.photos/id/"+idx+"/100/100",
  flaggedPhoto: false};
}



function genHtml(){
	var content = '';

	for(var i=0;i<pic.length;i++){
		content += genDiv(pic[i]);
	}

	console.log("content:"+content);
	$("#vote_id").html(content);
}


function genDiv(idx){
	return '<div class="vote_item"><a href="#">'+
			'<img id="img_'+idx+ '" src="https://picsum.photos/id/'+idx+'/100/100"></a>'+
			'<div class="vote_total">總票數:<div id="count_'+idx+'">0</div></div>'+
			'<a class="btn_like" id="a_'+idx+ '"  href="javascript:void(0)" OnClick="voteUp('+idx+')"><i class="fa fa-thumbs-up" aria-hidden="true"><div id="like_'+idx+'">0</div></i></a>'+
			'<a class="btn_unlike" id="b_'+idx+'" href="javascript:void(0)" OnClick="voteDown('+idx+')"><i class="fa fa-exclamation-triangle" aria-hidden="true"><div id="unlike_'+idx+'">0</div></i></a></div>';
}
genHtml();

// 模擬投票行為

function voteUp(idx) {
  var v = parseInt($("#like_"+idx).text())+1;
  console.log("voteUp="+idx);
  $("#like_"+idx).text(v);

  total(idx);
};// 按讚


function voteDown(idx){
  var v = parseInt($("#unlike_"+idx).text())-1;
  $("#unlike_"+idx).text(v);	
  console.log("votwDown="+idx);
  total(idx);

}; // 倒讚

function total(idx){
  var count = parseInt($("#like_"+idx).text())+parseInt($("#unlike_"+idx).text());
 
  if (count>=0){
    $("#count_"+idx).text(count);	
    console.log("vote="+count);
  } else  {
  	$("#img_"+idx).attr('src','https://picsum.photos/id/149/100/100');
    $("#count_"+idx).text(count);	
    window.alert("很抱歉，此圖片#img"+idx+"，因檢舉過多而下架!");
  }

};// 重新計算總數字+確認是否下架
