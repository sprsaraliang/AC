'use strict'

// user profile
const user1 = { name: 'Kermit Frog', genre: 'rock', isMember: true }
const user2 = { name: 'Kay Hoffman', genre: 'R & B', isMember: false }

// rock recommendations
let rockList = [
  "'Feel It Still' by Portugal. The Man",
  "'Africa' by Weezer",
  "'Jumpsuit' by twenty one pilots",
  "'Zombie' by Bad Wolves",
  "'Love It If We Made It' by The 1975",
  "'Hunger' by Florence + The Machine",
  "'Something Human' by Muse",
  "'Colors' by Beck"
]

// hip hop recommendations
let hiphopList = [
  "'In My Feelings' by Drake",
  "'Better Now' by Post Malone",
  "'This Is America' by Childish Gambino",
  "'Be Careful' by Cardi B",
  "'Bed' by Nicki Minaj ft. Ariana Grande",
  "'I Might Need Security' by Chance The Rapper"
]

const database = {
  hiphop: hiphopList,
  rock: rockList
}

/// //////////////////////////////////////////// functions

function countSong() {
  let totalSongs = 0
  let msg = ''

  for (let i in database) {
    let numSongs = database[i].length
    msg += `There are ${numSongs} ${i} songs available.\n`
    totalSongs += numSongs
  }

  msg += `Total songs in database: ${totalSongs}\n`
  console.log(msg)
}

// ingest user info, perform recommendation
function recommendSong(user) {
  let msg = '' // message to display to user
  msg += `Hello, ${user.name}!\n`

  // format genre string
  let genre = genreFormatter(user.genre)

  // search database
  if (Object.keys(database).includes(genre)) {
    // recommend a random song from our database
    let songlist = database[genre]
    let randomSong = songlist[Math.floor(Math.random() * songlist.length)]
    msg += `Here is our recommended ${genre}: ${randomSong}\n`
  } else {
    msg += "Sorry. We don't currently have a recommendation in that genre.\n"
    database[genre] = [] // create new genre
  }

  if (user.isMember) {
    msg += 'Thanks for being a member!\n'
  } else {
    msg += 'Consider subscribing!\n'
  }

  return msg
}

// formatting for a uniform database
function genreFormatter(text) {
  while (text.indexOf(' ') > 0) {
    text = text.replace(' ', '')
  }
  return text.toLowerCase()
}

/// ///////////////////////////////////////////////
console.log(recommendSong(user1))
console.log(recommendSong(user2))
countSong()
