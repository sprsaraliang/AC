(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []

  const dataPanel = document.getElementById('data-panel')
  const searchForm = document.getElementById('search')
  const searchInput = document.getElementById('search-input')

  const pagination = document.getElementById('pagination')
  const ITEM_PER_PAGE = 12

  const listPanel = document.getElementById('list-panel')
  let paginationData = []

  let onPage = 1 //起始預設頁面為1
  let onType = "card" //起始排列樣式頁面為 card
  let onResult //專門讀取localStorage內results結果

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    localStorage.setItem('results', JSON.stringify(data)) //將所有結果results記錄在localStorage內
    localStorage.setItem('type', onType) //預設排列樣式並記錄在localStorage內
    localStorage.setItem('page', onPage) //預設當前頁數並記錄在localStorage內

    getTotalPages(data) // displayDataList(data)顯示所有結果
    getPageData(onPage, data, onType) // 顯示目前頁數、所有結果、預設排列樣式
  }).catch((err) => console.log(err))

  // listen to data panel
  dataPanel.addEventListener('click', (event) => {
    console.log(event.target);
    if (event.target.matches('.btn-show-movie')) {
      showMovie(event.target.dataset.id)
    } else if (event.target.matches('.btn-add-favorite')) {
      addFavoriteItem(event.target.dataset.id)
    }
  })

  // list排列樣式切換：
  listPanel.addEventListener('click', (event) => {

    if (event.target.matches('.fa-th')) {
      console.log("Card形式-列表顯示")
      localStorage.setItem('type', "card") //因按下了＂Card＂按鈕， localStorage內的type設定為Card顯示

    } else if (event.target.matches('.fa-bars')) {
      console.log("Table形式-列表顯示")
      localStorage.setItem('type', "table") //因按下了＂Table＂按鈕， localStorage內的type設定為Table顯示
    }

    onResult = JSON.parse(localStorage.getItem("results"));
    onType = localStorage.getItem("type")
    onPage = localStorage.getItem("page")

    console.log(onType)
    console.log(onPage)
    console.log(onResult)

    // 傳入localStorage內的　results、當前排列樣式、當前頁數來做相關顯示。
    getTotalPages(onResult)
    getPageData(onPage, onResult, onType)

  })


  // listen to search form submit event
  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    let results = []
    const regex = new RegExp(searchInput.value, 'i')

    results = data.filter(movie => movie.title.match(regex))
    localStorage.setItem('results', JSON.stringify(results))
    console.log(results)
    displayDataList(results)

  })

  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <!-- "More" button -->
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  function displayTableList(data) {
    let htmlContent = ''
    htmlContent += `<table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col-2">No.</th>
                      <th scope="col-8">Movie Name</th>
                      <th scope="col-1">-</th>
                      <th scope="col-1">-</th>
                    </tr>
                  </thead>
                 <tbody> `
    data.forEach(function (item, index) {
      htmlContent += `

             <tr>
                <th scope="row">${item.id}</th>
                <td>${item.title}</td>
                <td><button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button></td>
                <td><button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button></td>
            </tr>
           
          `
    })
    htmlContent += `  </tbody>
          </table>`
    dataPanel.innerHTML = htmlContent
  }

  function addFavoriteItem(id) {
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    onResult = JSON.parse(localStorage.getItem("results"));
    const movie = onResult.find(item => item.id === Number(id))

    if (list.some(item => item.id === Number(id))) {
      alert(`${movie.title} is already in your favorite list.`)
    } else {
      list.push(movie)
      alert(`Added ${movie.title} to your favorite list!`)
    }
    localStorage.setItem('favoriteMovies', JSON.stringify(list))
  }

  function showMovie(id) {
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

  // listen to pagination click event
  pagination.addEventListener('click', event => {
    console.log("當前頁面:" + event.target.dataset.page)
    if (event.target.tagName === 'A') {
      localStorage.setItem('page', event.target.dataset.page) //每次按下頁數，就把頁數存進localStorage的'page'中
      onPage = localStorage.getItem('page');
      onType = localStorage.getItem("type")
      onResult = JSON.parse(localStorage.getItem("results"));

      getPageData(onPage, onResult, onType)
    }
  })


  function getPageData(pageNum, data, type) {
    paginationData = data || paginationData
    let offset = (pageNum - 1) * ITEM_PER_PAGE
    let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)

    if (type === "card") {
      displayDataList(pageData)
    } else if (type === "table") {
      displayTableList(pageData)
    }
  }

  function getTotalPages(data) {
    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
    let pageItemContent = ''
    for (let i = 0; i < totalPages; i++) {
      pageItemContent += `
        <li class="page-item">
          <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
        </li>
      `
    }
    pagination.innerHTML = pageItemContent
  }

  searchForm.addEventListener('submit', event => {
    event.preventDefault()

    let results = []
    const regex = new RegExp(searchInput.value, 'i')

    results = data.filter(movie => movie.title.match(regex))
    localStorage.setItem('results', JSON.stringify(results)) //將搜尋結果存在storage
    console.log(results)


    onPage = 1 //每次查詢結果，皆從第1頁開始
    localStorage.setItem('page', onPage) //並且將當前頁存入localStorage

    onType = localStorage.getItem("type")

    //查詢當前的模式
    // displayDataList(results)
    getTotalPages(results)
    getPageData(onPage, results, onType)
  })

})()