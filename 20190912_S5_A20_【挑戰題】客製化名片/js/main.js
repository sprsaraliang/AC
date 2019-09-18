const form = document.forms[0];
const nameField = document.querySelector('#input_name');
const urlField = document.querySelector('#input_url');
const introField = document.querySelector('#input_intro');
const theme = document.querySelector('form select');
const h3 = document.querySelector('.namecard h3');
const img = document.querySelector('.namecard img');

const p = document.querySelector('.card_right p');
const namecard = document.querySelector('.namecard');
const show_warring = document.querySelector('.alert h4');
let warring ;
let img_src ;

form.addEventListener('submit', checking_nameCard);


function checking_nameCard(event) {
  event.preventDefault();

  let name = nameField.value;
  let url = urlField.value;

  console.log(url);
  let intro = introField.value;
  let url_match = url.match(/^((ht|f)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/);

  warring = "";

    if (name.length == 0) {
      warring += "Name 尚未填寫。<br/>";
    }

    if (intro.length == 0) {
      warring += "intro 尚未填寫。<br/>";
    }

    if (theme.options[0].selected == true) {
      warring += "theme 尚未選擇<br/>";
    }

    if(url.length>0){
      img_src=urlField.value;
    }

    if(url.length==0){
      img_src="https://www.ekcreditunion.co.uk/wp-content/uploads/2018/02/Blank-Silhouette-768x768.jpg";
    }

    if (name.length > 0 && intro.length > 0 && warring == "") {
      creat_nameCard();
    }

    console.log(warring);
    show_warring.innerHTML = warring;

  
}

function creat_nameCard(event){
    h3.innerHTML = nameField.value;
    img.src = img_src;
    p.innerHTML = introField.value;

    namecard.className = "namecard";
    namecard.classList.add(theme.value);
}