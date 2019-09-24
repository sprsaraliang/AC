let name;
let img;
let email;

btn.addEventListener('click', addItem);

function addItem(event) {
	for (var i =0; i < 3; i++) {
		random()
	}

}

function random() {
	axios.get('https://randomuser.me/api/?gender=female').then(function(response){
		name=(response.data.results[0]).name.last+"  "+(response.data.results[0]).name.first;
		img=(response.data.results[0]).picture.large;
		email=(response.data.results[0]).email;
		addDiv(name,img,email);
	    
	  }).catch(function(error){
	    console.log(error)
	})
}

function addDiv(name,img,email){

	let div = document.createElement("div");
	let h3 = document.createElement("h3");
	let p = document.createElement("p");
	let pic = document.createElement("img");

	div.className = "name_card";
	h3.innerHTML=name;
	pic.src =img;
	p.innerHTML=email;

	div.appendChild(h3);
	div.appendChild(pic);
	div.appendChild(p);

	document.getElementById("myDiv").appendChild(div);

	//console.log(div);
}
