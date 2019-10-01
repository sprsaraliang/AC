// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://api.lyrics.ovh/v1/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}


// WRITE YOUR CODE ////////////////////////

console.log(album.tracks.length);
creatTracks();

const list = document.getElementById("song-list"); //歌曲清單
list.addEventListener('click',getLyric);
const lyricsBlock= document.getElementById("lyrics-panel");//歌詞區域


function getLyric(event) {
  const clickTracks = event.target;
  axios.get(BASE_URL+album.artist+'/'+clickTracks.text).then(function(response){
  showLyrics(response.data.lyrics);
  }).catch(function(error){
      console.log(error)
 })

}

function creatTracks() {
  const node = document.createElement("ul");        
  node.className = "nav flex-column nav-pills";  
  node.setAttribute('role', 'tablist');

    for (let i=0; i< album.tracks.length ; i++) {
        let liNode = document.createElement("li"); 
        liNode.setAttribute('class', 'nav-item');
        let aNode = document.createElement("a");        
        aNode.className="nav-link";
        aNode.setAttribute('href', '#');
        aNode.setAttribute('data-toggle', 'pill');
        aNode.setAttribute('role', 'tab');
        aNode.text=album.tracks[i];
        
        liNode.appendChild(aNode);      
        node.appendChild(liNode); 

    }
    document.getElementById("song-list").appendChild(node);    

}

function showLyrics(str) {
  lyricsBlock.innerHTML = '<pre>'+str+'<pre>';
}
