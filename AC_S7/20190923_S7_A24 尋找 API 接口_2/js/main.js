let name;
let img;
let email;
const mydiv=document.querySelector('.mydiv');
const btn = document.querySelector('.btn');
btn.addEventListener('click', random);


function random(event) {
axios.get('https://randomuser.me/api/').then(function(response){
	
//	console.log(response.data);
	name=(response.data.results[0]).name.last+"  "+(response.data.results[0]).name.first;
	img=(response.data.results[0]).picture.large;
	email=(response.data.results[0]).email;
//	console.log(name);
//	console.log(img);
//	console.log(email);
	document.getElementById("rm_name").innerHTML=name;
	document.getElementById("rm_img").setAttribute("src", img)
	document.getElementById("rm_email").innerHTML=email;
    // console.log(response.data);
  }).catch(function(error){
    console.log(error)
})
}
