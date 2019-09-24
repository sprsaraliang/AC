let movies = [{
  title: 'The Avengers',
  image: 'https://bit.ly/2NQOG6H',
  rating: 0
},
{
  title: 'Our Times',
  image: 'https://bit.ly/2OsGmv2',
  rating: 0
},
{
  title: 'Aquaman',
  image: 'https://bit.ly/2zmcLxo',
  rating: 0
}]

const dataPanel = document.querySelector('#data-panel');




dataPanel.addEventListener('click', vote_Count);


function vote_Count(event){

  const th_vote = event.target.parentElement;


  const icon_html = '<span class="fa fa-thumbs-up"></span><span class="fa fa-thumbs-down px-2"></span>';
  const span_vote_s ='<span>';
  const span_vote_e ='</span>';

  if (th_vote.tagName == 'TD' && event.target.classList.contains('fa-thumbs-up')) {
    
    v = parseInt(th_vote.textContent) +1 ;
        th_vote.innerHTML = icon_html + span_vote_s+ v +span_vote_e;

  } else if (th_vote.tagName == 'TD' && event.target.classList.contains('fa-thumbs-down')) {

      v = parseInt(th_vote.textContent) - 1;
      if (v >= 0) {
        th_vote.innerHTML = icon_html +span_vote_s+ v +span_vote_e;
      } else {
        th_vote.innerHTML = icon_html +span_vote_s+ 0 +span_vote_e;
      }

  } else if (th_vote.tagName == 'TD' && event.target.classList.contains('btn-danger')){
    let tr = th_vote.parentElement; 
    tr.remove();
  }


}


displayMovieList(movies);

function displayMovieList (data) {
  let htmlContent = `
    <table class="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Rating</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
    `;

  for (let i = 0; i < data.length; i++) {
    htmlContent += `
        <tr>
          <td>
            <img src = ${data[i].image} width = "70" class="img-thumbnail" >
          </td>
          <td>${data[i].title}</td>
          <td>
            <span class="fa fa-thumbs-up"></span>
            <span class="fa fa-thumbs-down px-2"></span>
            <span>${data[i].rating}</span>
          </td>
          <td>
            <button class="btn btn-sm btn-danger">X</button>
          </td>
        </tr>
      `;
  }

  htmlContent += `
      </tbody>
    </table>
  `;

  dataPanel.innerHTML = htmlContent;
}