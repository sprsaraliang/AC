const BASE_URL = 'https://lighthouse-user-api.herokuapp.com';
const USERS_URL = BASE_URL + '/api/v1/users';
const data = [];

let pagePanel = document.getElementById("page-panel");
let dataPanel;
let favPanel;

let pageHtml = ""; //整個頁面Html結構
let dataHtml = ""; //USER列表Html
let favHtml = ""; //favorite列表Html
let favlist;

let pagination;
const ITEM_PER_PAGE = 12;

let onPage = 1; //起始預設頁面為1
let onResult = []; //專門讀取localStorage內results結果


(function() {
    axios.get(USERS_URL).then((response) => {
        data.push(...response.data.results);

        onResult = data;
        localStorage.setItem('results', JSON.stringify(onResult));

        //重複測試容易有暫存，每次進來都將喜好清單刪除
        localStorage.removeItem("favorite");
        //console.log(onResult);

        //產生網頁各區區塊之框架

        //console.log("pageHtml:" + loadPage());
        pagePanel.innerHTML = loadPage();


        //dataPanel:產生USER所有列表內容+產生總頁數
        dataPanel = document.getElementById("data-panel");
        reloadDataPanel();


        // favlist = JSON.parse(localStorage.getItem('favorite')) || []
        favPanel = document.getElementById("favorite-panel");




        //事件偵測：點擊User圖片
        dataPanel.addEventListener('click', (event) => {
            let userId = event.target.dataset.id;
            let imgId = "img_" + String(userId);

            if (event.target.matches('.card-img-top')) {
                //console.log("事件偵測：點擊User圖片之userId:" + userId);
                showInfo(userId);
            }
            if (event.target.matches('.fa-heart')) {
                //console.log("事件偵測：點擊愛心，準備啟動加入最愛清單函式");

                if (event.target.classList.contains('loveheart')) {

                    //如果已經有 loveheart Class，需要移除樣式*/
                    event.target.classList.remove("loveheart");
                    // document.getElementById(imgId).classList.remove("lightimg");
                    let aNode = event.target.parentElement;
                    let divNode = aNode.parentElement;
                    let divCardNode = divNode.parentElement; //找到上三層的節點
                    divCardNode.classList.remove("light-user")

                    /*最愛清單內將此人移除*/
                    removeFavoriteItem(event.target.dataset.id);
                    favHtml = "";
                    favlist = JSON.parse(localStorage.getItem('favorite')) || []
                    favPanel.innerHTML = dataFavorite(favlist);
                    //console.log(favlist);dataFavorite(


                    /*重新顯示data-panel的內容★*/
                    reloadDataPanel();

                } else {
                    /*點選愛心之動畫與樣式*/
                    event.target.classList.add("loveheart");
                    // document.getElementById(imgId).classList.add("lightimg");
                    let aNode = event.target.parentElement;
                    let divNode = aNode.parentElement;
                    let divCardNode = divNode.parentElement; //找到上三層的節點
                    divCardNode.classList.add("light-user")


                    /*加入最愛清單*/
                    addFavoriteItem(event.target.dataset.id);
                    favHtml = "";
                    favlist = JSON.parse(localStorage.getItem('favorite')) || []
                        //console.log(favlist);

                    favPanel.innerHTML = dataFavorite(favlist);
                }

            }

            if (event.target.matches('.page-link')) {
                //console.log("事件偵測：點擊頁數，準備啟動頁數切換");

                onResult = JSON.parse(localStorage.getItem('results'));

                onPage = event.target.dataset.page; //點擊的頁面

                reloadDataPanel();

            }
        })



        pagePanel.addEventListener('submit', (event) => {


            //console.log("事件偵測：送出搜尋，搜尋函式啟動");
            event.preventDefault();

            onResult = dataResult();
            localStorage.setItem('results', JSON.stringify(onResult));


            onPage = 1;
            let defaultPage = getPageData(1, onResult);
            let dataHtml = ""

            //產生USER所有列表內容+頁數導覽頁
            dataHtml += displayUser(defaultPage) + creatPage();
            dataPanel.innerHTML = dataHtml;

            //console.log("dataHtml=" + dataHtml);

            creatDataHtml(defaultPage); //顯示當頁內容
            getTotalPages(1, onResult);


            if (favPanel.classList.contains("active")) {
                favPanel.classList.remove("active");
                favPanel.classList.remove("show");
                dataPanel.classList.add("active");
                dataPanel.classList.add("show");
            }


        })


        favPanel.addEventListener('click', (event) => {
            let userId = event.target.dataset.id;
            let imgId = "img_" + String(userId);

            if (event.target.matches('.card-img-top')) {
                //console.log("事件偵測：點擊User圖片之userId:" + userId);
                showInfo(userId);
            }
            if (event.target.matches('.fa-heart')) {
                //console.log("事件偵測：點擊愛心，準備啟動加入最愛清單函式");

                if (event.target.classList.contains('loveheart')) {

                    //如果已經有 loveheart Class，需要移除樣式*/

                    /*如果頁面上有那個人的話：移除ＯＫ，但如果頁面上沒有那個人的話移除會失敗，因為兩個PANEL都有同樣的圖片ID*/
                    event.target.classList.remove("loveheart");
                    //document.getElementById(imgId).classList.remove("lightimg");


                    /*最愛清單內將此人移除*/
                    removeFavoriteItem(event.target.dataset.id);
                    favHtml = "";
                    favlist = JSON.parse(localStorage.getItem('favorite')) || []
                    favPanel.innerHTML = dataFavorite(favlist);
                    //console.log(favlist);dataFavorite(


                    /*重新顯示data-panel的內容★*/
                    reloadDataPanel();

                } else {
                    /*點選愛心之動畫與樣式*/
                    event.target.classList.add("loveheart");
                    //document.getElementById(imgId).classList.add("lightimg");

                    /*加入最愛清單*/
                    addFavoriteItem(event.target.dataset.id);
                    favHtml = "";
                    favlist = JSON.parse(localStorage.getItem('favorite')) || []
                        //console.log(favlist);

                    favPanel.innerHTML = dataFavorite(favlist);
                }

            }

            if (event.target.matches('.page-link')) {
                //console.log("事件偵測：點擊頁數，準備啟動頁數切換");

                onResult = JSON.parse(localStorage.getItem('results'));
                //console.log("onResult=" + onResult);

                onPage = event.target.dataset.page; //點擊的頁面
                //console.log("onPage=" + onPage);
                reloadDataPanel();

            }

        })

        $("#loading").hide();




        function creatDataHtml(data) {
            $("#loading").show();
            let dataHtml = "";
            dataHtml = displayUser(data) + creatPage();
            dataPanel.innerHTML = dataHtml;
            getTotalPages(onPage, data); //變更頁面上的頁數導覽，成為完整的頁面
            $("#loading").hide();
        }


        function addFavoriteItem(idx) { //加入最愛清單
            //console.log("成功執行addFavoriteItem，加入編號ide:" + idx);

            const list = JSON.parse(localStorage.getItem('favorite')) || [];
            const fdata = data.find(item => item.id === Number(idx));

            if (list.some(item => item.id === Number(idx))) {
                //console.log("is already in your favorite list.");
            } else {
                list.push(fdata);
                //console.log("Added to your favorite list!");
            }

            localStorage.setItem('favorite', JSON.stringify(list));
            //console.log("localStorage內的favorite個數:" + list);
        }

        function removeFavoriteItem(idx) { //移除最愛清單
            //console.log("removeFavoriteItem，移除編號ide:" + idx);

            const favList = JSON.parse(localStorage.getItem('favorite')) || [];
            const removeData = favList.find(item => item.id === Number(idx));
            let i = favList.indexOf(removeData);

            favList.splice(i, 1);

            localStorage.removeItem("favorite"); //重置favorite內的所有內容
            localStorage.setItem('favorite', JSON.stringify(favList)); //重新塞入favorite的所有內容

          
        }


        function dataResult() { //搜尋
            let result = data.filter(function(obj, index, array) {

                let checkedMale = $('#checkMale:checked').val();
                let checkedFemale = $('#checkFemale:checked').val();
                let lbound = $("#lbound").val();
                let ubound = $("#ubound").val();
                let keyword = $("#keyword").val();

                return (obj.gender === checkedMale || obj.gender === checkedFemale) &&
                    (parseInt(obj.age, 10) > parseInt(lbound, 10) && parseInt(obj.age, 10) < parseInt(ubound, 10)) &&
                    (keyword === '' ? true : obj.name.indexOf(keyword) != -1 || obj.surname.indexOf(keyword) != -1);
            });

            onResult = result;
            return result;

        }

        function reloadDataPanel() {

            let defaultPage = getPageData(onPage, onResult);
            let dataHtml = ""


            dataHtml += displayUser(defaultPage) + creatPage(); //產生USER所有列表內容+頁數導覽頁
            dataPanel.innerHTML = dataHtml;

            creatDataHtml(defaultPage); //顯示當頁內容
            getTotalPages(onPage, onResult);

        }

        function loadPage() {

            let str = "";

            /*網頁區塊區塊產生順序*/
            str += creatHeader(); //上方標題
            str += creatSearch(); //搜尋列產生
            str += creatTabContent(); //標籤列產生
            str += creatCard(); //內容框架產生*(隱藏)
            str += creatFooter(); //Footer產生
            return str;
        }


        function creatHeader() { //功能切換-Tab【列表】建立
            let str = `  <div class="col-12 p-3 mb-2"><h1>Fake User List</h1></div>

                  <!-- navigation -->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active show" data-toggle="tab" href="#data-panel" role="tab" aria-controls="data-panel" aria-selected="true">Home</a>
                    </li>
                   <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#favorite-panel" role="tab" aria-controls="favorite-panel" aria-selected="false">favorite</a>
                    </li>
                    
                </ul> `
            return str;
        }

        function creatTabContent() { //功能切換-Tab【內容區塊】建立
            let str = `<div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="data-tab" id="data-panel"> 
                         <!-- print User list here -->
                        </div>
                        
                        <div class="tab-pane fade"  role="tabpanel" id="favorite-panel" aria-labelledby="favorite-tab">Sorry...No item here</div>
                        </div>
                  </div>`
            return str;
        }


        function creatSearch() { //搜尋BAR建立
            let str = ` <div class="card-columns col-sm-12 border-0 align-self-center search-bar" style="background-color='#fff'">
                            <div class="card-transparent  testimonial-card  text-center border-0"> 
                                 <div class="card-body  mx-auto">
                                         <label>年齡：</label>
                                         <input id='lbound' type='number' size='2' value="15" width='20px' min="15" max="80" />
                                         -
                                         <input id='ubound' type='number' size='2' value="80" width='20px' min="15" max="80" "/>
                                 </div>
                            </div>
                            <div class="card-transparent  testimonial-card  text-center border-0">
                                  <div class="card-body mx-auto">
                                         <div class="custom-control custom-checkbox custom-control-inline">
                                              <input type="checkbox" class="custom-control-input" id="checkMale" value="male" checked>
                                              <label class="custom-control-label" for="checkMale">male</label>
                                        </div>
                                         <div class="custom-control custom-checkbox custom-control-inline">
                                              <input type="checkbox" class="custom-control-input" id="checkFemale" value="female" checked>
                                              <label class="custom-control-label" for="checkFemale" >female</label>
                                        </div>           
                                  </div>

                            </div>
                            <div class="card-transparent  testimonial-card  text-center border-0"> 
                                 <div class="card-body mx-auto">
                                    <form>
                                            <input type="text" id="keyword" placeholder="EX:s">
                                            <button type="submit" id="btn-search" class="btn-search"><i class="fa fa-search"></i></button>
                                    </form>
                                 </div>
                            </div>
                            
                        </div> `
            return str;
        }


        function displayUser(data) { //USER列表區塊顯示

            favlist = JSON.parse(localStorage.getItem('favorite')) || []


            let str = `<div class="card-columns col-sm-12">`;

            data.forEach(function(item, index) {

                let result = favlist.filter(function(obj, index, array) {
                    return (obj.id === item.id);
                });


                if (result != "") { //確認此人有在最愛名單，就加入 img light 讓圖片變亮
                    str += `         <div class="card text-center card-user light-user">`
                } else {
                    str += `         <div class="card text-center card-user">`
                }
                str += `                  <div data-toggle="modal" data-target="#UserModal" >
                                      <img class="card-img-top" src="${item.avatar}" alt="Card image cap" data-id="${item.id}" id="img_${item.id}">
                                  </div>
                                   
                                    <div class="card-share" style="position: relative;top:-25px">
                                        <a class="btn-floating btn-action share-toggle float-right waves-effect waves-light ml-auto mr-4">`

                if (result != "") {
                    //確認此人有在最愛名單，就加入 loveheart  Class，顯示紅色愛心
                    str += `                     <i class="fas fa-heart loveheart" data-id="${item.id}"></i></a> `
                } else {
                    //沒在最愛名單，預設顯示灰色愛心
                    str += `                    <i class="fas fa-heart" data-id="${item.id}"></i>
                                        </a>`
                }
                str += `                     </div> 
                                     <div class="card-body">
                                          <h5 class="card-title">${item.name} ${item.surname}</h5>
                                     </div>
                               </div> `

            });

            str += `</div>`

            return str;
        }


        function dataFavorite(fdata) { //喜歡列表區塊顯示
            let str = `<div class="card-columns col-sm-12">`;

            fdata.forEach(function(item, index) {
                str += `
                    <div class="card  text-center card-user light-user">
                        <div data-toggle="modal" data-target="#UserModal" >
                            <img class="card-img-top" src="${item.avatar}" alt="Card image cap" data-id="${item.id}">
                        </div>
                      
                        <div class="card-share" style="position: relative;top:-25px">
                          <a class="btn-floating btn-action share-toggle float-right waves-effect waves-light ml-auto mr-4" >
                          <i class="fas fa-heart loveheart" data-id="${item.id}"></i></a>
                        </div>

                        <div class="card-body">
                            <h5 class="card-title">${item.name} ${item.surname}</h5>
                        </div>
                    </div>
                    `
            })

            str += `</div>`;
            return str;

        }


        function creatPage() { //頁數導覽列建立
            let str = `
                   <nav aria-label="Page navigation">
                          <ul class="pagination justify-content-center" id="pagination">
                            <li class="page-item">
                              <a class="page-link" href="#">1</a>
                            </li>
                          </ul>
                   </nav>  `
            return str;
        }

        function creatCard() { //User資料內容區塊創立
            let str = `
          <div class="modal fade" id="UserModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="card testimonial-card mt-2 mb-3  text-center card-user light-user">
                    <div>
                            <div class="lds-heart">
                                <div>
                                </div>
                            </div>
                    </div>
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
          </div> 

          
            `
            return str;
        }

        function creatFooter() {
            return `
            </div>
            <footer style="text-align: center!important;">
                  | Just a test website | copyright 2019 © all rights reserved 
            </footer>`
        }


        function showInfo(targetId) {
            $("info_loading").show();

            const modalId = document.getElementById('show-id'); //預備置放id
            const modalName = document.getElementById('show-name'); //預備置放 name、surname
            const modalEmail = document.getElementById('show-email'); //預備置放 email
            const modalImage = document.getElementById('show-image'); //預備置放 avatar
            const modalBirthday = document.getElementById('show-birthday'); //預備置放 birthday
            const modalInfo = document.getElementById('show-info'); //預備置放 region、age、gender

            //console.log(USERS_URL + "/" + targetId);

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

            $("info_loading").hide();
        }


        function getPageData(pageNum, data) {
            paginationData = data || paginationData;
            let offset = (pageNum - 1) * ITEM_PER_PAGE;
            let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE);
            return pageData;
        }


        function getTotalPages(page, data) {
            let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1;
            let pageItemContent = "";

            for (let i = 0; i < totalPages; i++) {

                if (parseInt(onPage) == (i + 1)) {
                    pageItemContent += `    <li class="page-item active">`
                } else {
                    pageItemContent += `    <li class="page-item">`
                }
                pageItemContent += `          <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
                                    </li>
                                           `
                
            }

            pagination = document.getElementById('pagination');
            pagination.innerHTML = pageItemContent;
        }



    }).catch((err) => console.log(err))

})()