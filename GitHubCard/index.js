/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const gitHubCardList = document.querySelector(".cards");

axios
  .get('https://api.github.com/users/ngaivoronski')
  .then(response => {
    const newCard = gitHubCard(response);
    gitHubCardList.appendChild(newCard);
})


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/


/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


// Adding instructors
const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];

axios
  .all(followersArray.map(user => axios.get('https://api.github.com/users/' + user)))
  .then(response => {
    console.log(response);
    response.forEach(item => {
      const newCard = gitHubCard(item);
      gitHubCardList.appendChild(newCard);
    })
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function gitHubCard(obj) {
  const newCard = document.createElement('div'),
        newImg = document.createElement('img'),
        cardInfo = document.createElement('div'),
        cardName = document.createElement('h3'),
        cardUserName = document.createElement('p'),
        cardLocation = document.createElement('p'),
        cardProfile = document.createElement('p'),
        cardProfileLink = document.createElement('a'),
        cardFollowers = document.createElement('p'),
        cardFollowing = document.createElement('p'),
        cardBio = document.createElement('p');
  
  // constructor structure
  newCard.appendChild(newImg);
  newCard.appendChild(cardInfo);
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardUserName);
  cardInfo.appendChild(cardLocation);
  cardInfo.appendChild(cardProfile);
  cardProfile.appendChild(cardProfileLink);
  cardInfo.appendChild(cardFollowers);
  cardInfo.appendChild(cardFollowing);
  cardInfo.appendChild(cardBio);

  // constructor API pulled content
  newCard.classList.add("card");
  newImg.src = obj.data.avatar_url;
  cardInfo.classList.add('card-info');
  cardName.classList.add('card-name');
  cardName.textContent = obj.data.name;
  cardUserName.classList.add('username');
  cardUserName.textContent = obj.data.login;
  cardLocation.textContent = 'Location: ' + obj.data.location;
  cardProfile.textContent = 'Profile : ';
  cardProfileLink.src = obj.data.url;
  cardFollowers.textContent = 'Followers: ' + obj.data.followers;
  cardFollowing.textContent = 'Following: ' + obj.data.following;
  cardBio.textContent = 'Bio: ' + obj.data.bio;
  
  return newCard;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
