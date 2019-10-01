/*index.js*/
(function () {
  // write your code here
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []

  axios.get(INDEX_URL)
  .then((response) => {
    data.push(...response.data.results);
    console.log(data);
    DisplayMovie(data);
  })

  .catch()

	const dataPanel=document.getElementById("data-panel");

	function DisplayMovie(data){
		let html="";
		data.forEach(function(item,index){
			html+=`
	        <div class="col-sm-3">
	          <div class="card mb-2">
	            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
	            <div class="card-body movie-item-body">
	              <h6 class="card-title">${item.title}</h5>
	            </div>

	            <!-- "More" button -->
	            <div class="card-footer">
	            <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
	            </div>
	          </div>
	        </div> `
	})

	dataPanel.innerHTML=html;

  	dataPanel.addEventListener('click', (event) => {
   		if (event.target.matches('.btn-show-movie')) {
   			console.log("event.target.dataset.id:"+event.target.dataset.id);
      		showMovie(event.target.dataset.id)  // modify here
    	}
    })
	
	function showMovie (id) {
    // get elements
	    const modalTitle = document.getElementById('show-movie-title')
	    const modalImage = document.getElementById('show-movie-image')
	    const modalDate = document.getElementById('show-movie-date')
	    const modalDescription = document.getElementById('show-movie-description')

	    // set request url
	    const url = INDEX_URL + id
	    console.log(url)

	    // send request to show api
	    axios.get(url).then(response => {
	      const data = response.data.results
	      console.log(data)

	      // insert data into modal ui
	      modalTitle.textContent = data.title
	      modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
	      modalDate.textContent = `release at : ${data.release_date}`
	      modalDescription.textContent = `${data.description}`
	    })
    }


}



})()

