/*index.js*/

const BASE_URL = 'https://lighthouse-user-api.herokuapp.com';
const USERS_URL = BASE_URL + '/api/v1/users';
const data = [];
const dataPanel = document.getElementById("data-panel");

(function () {

	axios.get(USERS_URL)
		.then((response) => {
			data.push(...response.data.results);
			console.log(data);
			displayUser(data);
		})
		.catch()

	dataPanel.addEventListener('click', (event) => {
		let userId = event.target.dataset.id;
		console.log(userId);
		if (event.target.matches('.card-img-top')) {
			showInfo(userId);
		}
	
    })

})()

function displayUser(data) {

	//User資料列表顯示
	let html="";
	
    //USER列表區塊顯示
	html += `<div class="col-12 p-3 mb-2 bg-light text-dark">Fake User List</div>	<div class="card-columns col-sm-12">`;
	
		data.forEach(function (item, index) {
			html += `
					<div class="card  text-center">
						<div data-toggle="modal" data-target="#UserModal">
							<img class="card-img-top" src="${item.avatar}" alt="Card image cap" data-id="${item.id}">
						</div>
					    <div class="card-body">
			  				<h5 class="card-title">${item.name} ${item.surname}</h5>
				        </div>
		            </div>
		  			`
		});

	html += `</div>`;

	//User資料內容區塊創立
	html += `
		  <div class="modal fade" id="UserModal" tabindex="-1" role="dialog" aria-hidden="true">
 			<div class="modal-dialog" role="document">
	    		<div class="card testimonial-card mt-2 mb-3  text-center">
			        <div class="card-body  mx-auto white">				   
				      <p id="show-id"></p>
			          <hr>
				      <img src="" class="rounded-pill rounded-circle" id="show-image">
				      <hr>
				      <h3 class="card-title font-weight-bold"> Hi! I'm <label class="text-info" id="show-name">Name</label></h3>
				      <h6 class="card-title" id="show-info">Region/Age/Gender <p id="show-region"></p></h6>
				      <p id="show-birthday"></p>
				      <hr>    
					  <i class="far fa-envelope"><label id="show-email"></label></i>
				    </div>
  				</div>
  			 </div>
		  </div>	`

	dataPanel.innerHTML = html;
}

function showInfo(targetId) {

	const modalId = document.getElementById('show-id'); //預備置放id
	const modalName = document.getElementById('show-name'); //預備置放 name、surname
	const modalEmail = document.getElementById('show-email'); //預備置放 email
	const modalImage = document.getElementById('show-image'); //預備置放 avatar
	const modalBirthday = document.getElementById('show-birthday'); //預備置放 birthday
	const modalInfo = document.getElementById('show-info'); //預備置放 region、age、gender

    console.log(USERS_URL+"/"+targetId);

	    axios.get(USERS_URL+"/"+targetId)
		.then((response) => {
			let userInfo = response.data;

			modalId.textContent = `No. ${userInfo.id}`;
			modalName.textContent = `${userInfo.name} ${userInfo.surname}`;
			modalEmail.textContent = `${userInfo.email}`;
			modalImage.src = userInfo.avatar;
			modalBirthday.textContent = userInfo.birthday;
			modalInfo.textContent = `From:${userInfo.region} | Age: ${userInfo.age} | ${userInfo.gender}`;
		})
		.catch()
}
