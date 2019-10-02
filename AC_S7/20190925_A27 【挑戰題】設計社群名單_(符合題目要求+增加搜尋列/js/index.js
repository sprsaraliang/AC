/*index.js*/

const BASE_URL = 'https://lighthouse-user-api.herokuapp.com';
const USERS_URL = BASE_URL + '/api/v1/users';
const data = [];
let fdata = []; //排序專用
const dataPanel = document.getElementById("data-panel");

let html = "";

(function() {
    axios.get(USERS_URL)
        .then((response) => {
            data.push(...response.data.results);
            console.log(data);
            loadPage(data);
            dataPanel.innerHTML = html;
        }).catch()

    dataPanel.addEventListener('click', (event) => {

        if (event.target.matches('.card-img-top')) {
            let userId = event.target.dataset.id;
            console.log(userId);
            showInfo(userId);
        }
    })

    dataPanel.addEventListener('submit', (event) => {
        event.preventDefault();
        showResult();

    })


})()

function loadPage(data) {
    /*區塊產生順序*/
    creatHeader();
    creatSearch();
    displayUser(data);
    creatCard();
    creatFooter();
}

function showResult() {
    fdata = data.filter(function(obj, index, array) {
        let checkedMale = $('#checkMale:checked').val();
        let checkedFemale = $('#checkFemale:checked').val();
        let lbound = $("#lbound").val();
        let ubound = $("#ubound").val();
        let keyword = $("#keyword").val();
        return (obj.gender === checkedMale || obj.gender === checkedFemale) &&
            (parseInt(obj.age, 10) > parseInt(lbound, 10) && parseInt(obj.age, 10) < parseInt(ubound, 10)) &&
            (keyword === '' ? true : obj.name.indexOf(keyword) != -1);
    });

    html = "";
    loadPage(fdata);
    dataPanel.innerHTML = html;
}

function creatHeader() {
    html += `<div class="col-12 p-3 mb-2"><h1>Fake User List</h1></div>`

}


function creatSearch() { //搜尋BAR建立
    html += ` <hr/><form >
                    <div class="col-12 col-sm-6" style="d-flex align-items-center justify-content-center">
                         <label>年齡：</label>
                         <input id='lbound' type='number' width='20px' oninput="if(value.length>2) value=value.slice(0,2)" placeholder="EX:20"/>
                         -
                         <input id='ubound' type='number' width='20px' oninput="if(value.length>2) value=value.slice(0,2)" placeholder="EX:25"/>
                     </div>
                    <div class="col-12 col-sm-1" style="d-flex align-items-center justify-content-center">
                        <label class="checkbox-inline">
                            <input type="checkbox" id="checkMale" value="male" checked>male
                        </label>
                    </div>
                    <div class="col-12 col-sm-2" style="d-flex align-items-center justify-content-center">
                        <label class="checkbox-inline">
                            <input type="checkbox" id="checkFemale" value="female" checked>female
                        </label>
                    </div>
                    <div class="col-12 col-sm-3" style="d-flex align-items-center justify-content-center">
                        <input type="text" id="keyword" placeholder="EX:s">
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </div>
                  </form>
                 <div class="col-12">
                 <hr/>
                 </div> `


}


function displayUser(data) { //USER列表區塊顯示
    html += `<div class="card-columns col-sm-12">`;

    data.forEach(function(item, index) {
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
}

function creatCard() { //User資料內容區塊創立
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
}

function creatFooter() {
    html += `</div>`
}


function showInfo(targetId) {

    const modalId = document.getElementById('show-id'); //預備置放id
    const modalName = document.getElementById('show-name'); //預備置放 name、surname
    const modalEmail = document.getElementById('show-email'); //預備置放 email
    const modalImage = document.getElementById('show-image'); //預備置放 avatar
    const modalBirthday = document.getElementById('show-birthday'); //預備置放 birthday
    const modalInfo = document.getElementById('show-info'); //預備置放 region、age、gender

    console.log(USERS_URL + "/" + targetId);

    axios.get(USERS_URL + "/" + targetId)
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