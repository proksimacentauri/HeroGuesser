var plebHero;
 var plebHeroIMG;
 var dotaItems;
 var heroes; 
 var gameGoing = true;
 var plebItems;
 var matchData;
 var plebId;
 var pleb;
var matches;


function loading() {
   fetchData();
    //myVar = setTimeout(showPage, 5000);
}

function showPage() {
  document.getElementsByClassName("loader")[0].style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}


function fetchData()
{
 var linkToHeroImages = "https://api.opendota.com/api/heroStats";
 var linkToRandomMatches = "https://api.opendota.com/api/publicMatches";
 var chosenMatch = "https://api.opendota.com/api/matches/";
 
 var request = new XMLHttpRequest();
 request.open('GET', linkToHeroImages,true );

 var request2 = new XMLHttpRequest();
 request2.open('GET', linkToRandomMatches,true);

 var request4 = new XMLHttpRequest();
request4.open('GET', "http://guessthehero.com/items.json" ,true);


 request.onload =   function () 
 {
 var data = JSON.parse(this.response);
 heroes = data;
  loadHeroes();
 }
  request.send();

request4.onload =  function () 
{
 var data = JSON.parse(this.response);
 dotaItems = data.itemdata;
}

 request4.send();
request2.onload =  function () 
{
 
 var data = JSON.parse(this.response);
 matches = data;
 var id = randomizeMatch(matches);
 chosenMatch += id;
 
 var request3 = new XMLHttpRequest();

 request3.open('GET', chosenMatch, true);

 request3.onload =  function () 
{
 var nata = JSON.parse(this.response);
 matchData = nata;
 if(checkUrl() == false)
 { 
 loadingElements();
 }
 else {
 }
}
 request3.send();

}
  request2.send();
  
}

function loadHeroes()
{
 getImagesStr(heroes);
 getImagesAgi(heroes);
 getImagesInt(heroes);
}

function loadingElements()
{
 pleb = randomizePlayer(matchData);
 plebHero =  getHeroIDPlayer(pleb);
 plebItems = getArrayOfItems(pleb);
 var parser = document.createElement('a');
 parser = "http://guessthehero.com/?id=" + matchData.match_id + "&number="+ plebId;
 history.pushState(null, '', parser);
 if(checkArrayIfEmpty(plebItems) == false)
 {

 ArrayIntoICon(dotaItems, plebItems, "items");
 }
 else {
  reset();
 }

}

function getParameterUrl()
{
 var urlString = window.location.href;
 console.log(window.location.search);
 var url = new URL(urlString);
 console.log(url.search);
 var urlname = url.search;
 var arrayofsearch = urlname.split("&");
 var stringofSearch = arrayofsearch.join("");
 console.log("hello"+ stringofSearch.length);
 if(stringofSearch.length == 0)
 { 
  var urlObj = {
    urlObject: url
  }
  return urlObj;
 }
 console.log(arrayofsearch);

 arrayofsearch[0] = arrayofsearch[0].replace(/\D+/g, '');
 arrayofsearch[1] = arrayofsearch[1].replace(/\D+/g, '');
 var matchId = arrayofsearch[0] ;
 var personId =arrayofsearch[1];
 
 var urlObj =  {
  urlObject: url,
  match_id: matchId,
  player_id: personId
 }
 console.log(urlObj);
 return urlObj;
}

function showForm() 
{
     var x = document.getElementById("formDiv");
    if (x.style.display == "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
} 

function getMatchHeroes()
{
 document.getElementById("matchSubmit").disabled = true;
 var id = document.getElementById("matchIdText").value;
 var gameLink = "https://api.opendota.com/api/matches/" + id;
 var request3 = new XMLHttpRequest();
 var arr;
 document.getElementById("heroRadiant").innerHTML = "";
 document.getElementById("heroDire").innerHTML = "";

 request3.open('GET', gameLink, true);

 request3.onload =  function () 
 {

  if(this.readyState === 4)
  {
   document.getElementById("textInfo").innerHTML = "";
   if(this.status == 404 || /^\d+$/.test(id) == false)
   { 
    document.getElementById("textInfo").innerHTML = "Please input a valid match id.";
    document.getElementById("matchSubmit").disabled = false;
    return false;
   }
   var nata = JSON.parse(this.response);
   if(nata.players[0].hero_id == null)
    {
      document.getElementById("textInfo").innerHTML = "Please input a valid match id.";
      document.getElementById("matchSubmit").disabled = false;
      return false;
    }

   matchData = nata;
   var matchPlayers = matchData.players;
   arr = getHeroIdsFromMatch(matchPlayers);
  loadHeroImages(heroes,arr,matchPlayers); 
  document.getElementById("textInfo").innerHTML = "";
  }
 }
 request3.send();
}

function getHeroIdsFromMatch(players)
{
  var arr = [];
 for(var i = 0; i < players.length; i++)
 {
   arr.push(players[i].hero_id);
 }
 return arr;
}

function loadHeroImages(data,arr,matchPlayers)
{
 var imgLink = "http://cdn.dota2.com/";
 var container1 = document.getElementById("heroRadiant");
 var container2 = document.getElementById("heroDire");
 var getHeroItems = [];

 for(var a = 0; a < arr.length; a++)
 {
  for(var i = 0; i < data.length; i++)
  { 
   if(data[i].id == arr[a])
   {
    if(a < 5)
    {
     if(a === 0) 
     {  
       container1.insertAdjacentHTML('beforeend', '<img src="radiantIcon.png" id="radiantTeamIcon"> <div id="radiantTeamText">Radiant Team</div>');
     }
    var fullImgLink = imgLink + data[i].img;
    getHeroItems.push(getArrayOfItems(matchPlayers[a]));
    container1.insertAdjacentHTML('beforeend', '<span class="heroDirs" id="heroDir'+a+'" onclick="alertMe(this.id)"><img class="formHeroes" src="'+fullImgLink+'" id="formHero'+a+'" onclick="alertMe(this.id)"></span>');
    ArrayIntoICon(dotaItems, getHeroItems[a], "heroDir"+a);
    container1.innerHTML += "<br>";
    }
    else {
      if(a === 5) 
     {  
       container2.insertAdjacentHTML('beforeend', '<img  src="direIcon.png" id="direTeamIcon"> <div id="direTeamText">Dire Team</div>');
        
     }
    var fullImgLink = imgLink + data[i].img;
    getHeroItems.push(getArrayOfItems(matchPlayers[a]));
    container2.insertAdjacentHTML('beforeend', '<span class="heroDirs" id="heroDir'+a+'" onclick="alertMe(this.id)"><img class="formHeroes" src="'+fullImgLink+'" id="formHero'+a+'" onclick="alertMe(this.id)"></span>');
    ArrayIntoICon(dotaItems, getHeroItems[a], "heroDir"+a);
    container2.innerHTML += "<br>";
   }
  }
 }
}
 document.getElementById("matchSubmit").disabled = false;
}

function alertMe(clickedId)
{ 
 var matchId = document.getElementById("matchIdText").value;
   clickedId = clickedId.replace(/\D/g,'');
 var matchLink = "https://api.opendota.com/api/matches/" + matchId;
  document.getElementById("matchId").innerHTML = "";
    document.getElementById("plebHer").src ="heroBefore.png";
   plebItems.length = 0;
 document.getElementById("heroTitle").innerHTML = "";
 loopResetImg();
 var linked = getParameterUrl();

 var request3 = new XMLHttpRequest();
 request3.open('GET', matchLink, true);
 
 request3.onload =  function () 
 {
  if(this.readyState === 4)
  {
   var nata = JSON.parse(this.response);
   matchData = nata;
   if(matchId == linked.match_id && linked.player_id == clickedId)
   {
     document.getElementById("formDiv").style.display = "none";
    return false;
   }
    document.getElementById("items").innerHTML = "";
     plebId = 0;
   pleb = getPlayer(matchData,clickedId);
   plebItems = getArrayOfItems(pleb);
   plebHero =  getHeroIDPlayer(pleb);
   ArrayIntoICon(dotaItems, plebItems, "items");
   document.getElementById("formDiv").style.display = "none";
   gameGoing = true;

    var parser = document.createElement('a');
 parser = "http://guessthehero.com/?id=" + matchData.match_id + "&number="+ plebId;
 history.pushState(null, '', parser);
  }
 }
  request3.send();
}

function checkUrl()
{
  var urlObj = getParameterUrl();
  var matchLink = "https://api.opendota.com/api/matches/" + urlObj.match_id;
 if (urlObj.urlObject.search != "")
 {
  var request3 = new XMLHttpRequest();
  request3.open('GET', matchLink, true);

  request3.onreadystatechange =  function () 
 {
  if(this.readyState === 4)
  {
   var nata = JSON.parse(this.response);
   matchData = nata;
   console.log("hello")
   pleb = getPlayer(matchData,urlObj.player_id);
   plebItems = getArrayOfItems(pleb);
   plebHero =  getHeroIDPlayer(pleb);
   ArrayIntoICon(dotaItems, plebItems, "items");
  }
 }
}
else {
  console.log("HELLO")
  return false;
}
request3.send();
}

function undisableButton()
{
   document.getElementById("newGame").disabled = false;
}

function reset()
{
 document.getElementById("newGame").disabled = true;
 chosenMatch = "https://api.opendota.com/api/matches/"; 
 var id = randomizeMatch(matches);
 plebId = 0;

 document.getElementById("plebHer").src ="heroBefore.png";
 plebItems.length = 0;
 chosenMatch += id;
 
 var heroImages = document.getElementsByClassName("hero");
 document.getElementById("matchId").innerHTML = "";
 document.getElementById("heroTitle").innerHTML = "";
 loopResetImg();
 document.getElementById("items").innerHTML = "";


var request3 = new XMLHttpRequest();
request3.open('GET', chosenMatch, true);

 request3.onreadystatechange =  function () 
{
 if(this.readyState == 4)
 {
 var nata = JSON.parse(this.response);
 matchData = nata;

 pleb = randomizePlayer(matchData);
 plebItems = getArrayOfItems(pleb);
 plebHero =  getHeroIDPlayer(pleb);
  if(checkArrayIfEmpty(plebItems) == false)
 {
  ArrayIntoICon(dotaItems, plebItems, "items");
  undisableButton();
 }
 else 
 {
  reset();
 }
   gameGoing = true;

    var parser = document.createElement('a');
 parser = "http://guessthehero.com/?id=" + matchData.match_id + "&number="+ plebId;
 history.pushState(null, '', parser);
 }
}
 request3.send();
}

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

function CopyLink() {
  copyTextToClipboard(location.href);
}

function getImagesStr(data)
{
  var container = document.getElementById("strength");
  var imgLink = "http://cdn.dota2.com/";
 for(var i = 0; i < data.length; i++)
 {
   if(data[i].primary_attr == "str")
   {
    var fullImgLink = imgLink + data[i].img;
    container.insertAdjacentHTML('beforeend', '<img class="hero" src="'+fullImgLink+'" id="'+data[i].id+'" onclick="getId(this.id)">');
     ///"<img src="fullImgLink" id="data[i].hero_id">";
   }
 }
}

function getImagesAgi(data)
{
  var container = document.getElementById("agility");
  var imgLink = "http://cdn.dota2.com/";
 for(var i = 0; i < data.length; i++)
 {
   if(data[i].primary_attr == "agi")
   {
    var fullImgLink = imgLink + data[i].img;
    container.insertAdjacentHTML('beforeend', '<img class="hero" src="'+fullImgLink+'" id="'+data[i].id+'" onclick="getId(this.id)">');
     ///"<img src="fullImgLink" id="data[i].hero_id">";
  
   }
 }
}

function getImagesInt(data)
{
  var container = document.getElementById("intelligence");
  var imgLink = "http://cdn.dota2.com/";
 for(var i = 0; i < data.length; i++)
 {
   if(data[i].primary_attr == "int")
   {
    var fullImgLink = imgLink + data[i].img;
    container.insertAdjacentHTML('beforeend', '<img class="hero" src="'+fullImgLink+'" id="'+data[i].id+'" onclick="getId(this.id)">');
     ///"<img src="fullImgLink" id="data[i].hero_id">";
  
   }
 }
}

function getId(clickedId,obj)
{
  var blub = document.getElementById(plebHero).src;
  var omegaLul = document.getElementById("plebHer");
  if(clickedId == plebHero)
  {   
     var heroName = butiful();
      document.getElementById("heroTitle").innerHTML = "you won! it was " + heroName;
      document.getElementById(plebHero).style.border = "3px solid green"; 
      omegaLul.src = blub; 
      document.getElementById("matchId").innerHTML = "Match Id: " + "<a target='_blank' href=https://www.opendota.com/matches/" + matchData.match_id + ">" + matchData.match_id + "</a>";
      gameGoing = false;
  }

  else if (clickedId != plebHero && gameGoing)
  {
   document.getElementById(clickedId).style.border = "3px solid red"; 
   reduceHeroesArray(clickedId);  
  }
}

function reduceHeroesArray(clickedId)
{
 var arr = [];
 arr.push(plebHero);
 arr.push(clickedId);


 for(var i = 0; i < 18; i++)
 {
  var random = Math.floor((Math.random() * 114));
  if(heroes[random] != clickedId && heroes[random] != plebHero)
  {
    arr.push(heroes[random]);
  }
 }
 console.log(arr);
 return arr;
}

function butiful()
{ 
  for(var i = 0; i < heroes.length; i++)
  {
    if(heroes[i].id == plebHero)
    {
      return heroes[i].localized_name;
    }
  }
}
function loopResetImg()
{
  var heroImages = document.getElementsByClassName("hero");
  for (i = 0; i < heroImages.length; i++) 
  {
        heroImages[i].style.border = "3px solid black";
    }
}

function randomizeMatch(data)
{
  var random = Math.floor((Math.random() * 100));
  var chosenMatch = data[random];
  return chosenMatch.match_id;
}


function randomizePlayer(data)
{
 var random = Math.floor((Math.random() * 10))
 var chosenPlayer = data.players[random];
 plebId = random;
 return chosenPlayer;
}


function getPlayer(data, playerId)
{
 var number = playerId;
 var chosenPlayer = data.players[number];
 plebId = number;
 return chosenPlayer;
}

function getHeroIDPlayer(obj)
{
  return obj.hero_id;
}

function getArrayOfItems(obj)
{
  var arrOfItems = [];
  arrOfItems.push(obj.item_0);
  arrOfItems.push(obj.item_1);
  arrOfItems.push(obj.item_2);
  arrOfItems.push(obj.item_3);
  arrOfItems.push(obj.item_4);
  arrOfItems.push(obj.item_5);
  return arrOfItems;
}

function checkArrayIfEmpty(array)
{
  var sum = 0;
 for(var i = 0; i < array.length; i++)
 {
  sum += array[i];
  
 }
 if(sum == 0)
 {  
    return true;
 }
 return false;
}

function ArrayIntoICon(data,array,divId)
{
  //items
  var item = document.getElementById(divId);
  var imgLink = "http://cdn.dota2.com/apps/dota2/images/items/";
  for(var i = 0; i < array.length; i++)
  {
    
   for (var a in data) 
   {
    if(array[i] == data[a].id)
    { 
      var fullImgLink =  imgLink + data[a].img;

      if(data[a].dname == "Kaya")
      { 
        fullImgLink = imgLink + "trident_lg.png?3";
      }
       item.innerHTML +='<img id="'+divId+'" src="'+fullImgLink+'">';
    }
   }
    if(array[i] == 0)
    {
      item.innerHTML += '<img src="empty.png">';
    }
  }
    showPage();
}

//http://cdn.dota2.com/apps/dota2/images/items/<name>_lg.png 