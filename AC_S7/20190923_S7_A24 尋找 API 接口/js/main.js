axios.get('https://dog.ceo/api/breeds/image/random').then(function(response){
    console.log(response.data.message);
    var img = document.createElement("img"); 
    img.src=response.data.message;
    document.getElementById('myDiv').appendChild(img);
  }).catch(function(error){
    console.log(error)
})