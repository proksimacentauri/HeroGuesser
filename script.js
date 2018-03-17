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
    myVar = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
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
request4.open('GET', "http://www.dota2.com/jsfeed/itemdata/?key=7C8B37F899203B917EA9CA4607F86FBE" ,true);


 request.onload =   function () 
 {
 var data = JSON.parse(this.response);
 heroes = data;
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
 console.log("I choose match number: " +id);
 chosenMatch += id;
 //console.log("the chosen match is" + chosenMatch);

 var request3 = new XMLHttpRequest();
  //console.log(chosenMatch);

 request3.open('GET', chosenMatch, true);

 request3.onload =  function () 
{
 var nata = JSON.parse(this.response);
 matchData = nata;
 loadingElements();
}
 request3.send();

}
  request2.send();
  
}

function loadingElements()
{
 getImagesStr(heroes);
 getImagesAgi(heroes);
 getImagesInt(heroes);
 pleb = randomizePlayer(matchData);
 plebHero =  getHeroIDPlayer(pleb);
 plebItems = getArrayOfItems(pleb);
  var url = "/" + matchData.match_id + "/" + plebId + "/";
  console.log(url);
 
 if(checkArrayIfEmpty(plebItems) == false)
 {
 ArrayIntoICon(dotaItems, plebItems);
 }
 else {
  reset();
 }
}

function reset()
{

 chosenMatch = "https://api.opendota.com/api/matches/"; 
 var id = randomizeMatch(matches);
 plebId = 0;

 document.getElementById("plebHer").src ="heroBefore.png"
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
    var url = "/" + matchData.match_id + "/" + plebId + "/";
  console.log(url);
  if(checkArrayIfEmpty(plebItems) == false)
  {
 
  ArrayIntoICon(dotaItems, plebItems);
  }

 else 
 {
  reset();
 }
   gameGoing = true;
 }
}

 request3.send();

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
 //console.log(imgLink);
 for(var i = 0; i < data.length; i++)
 {
   if(data[i].primary_attr == "agi")
   {
    //console.log("HI");
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
  console.log("hello" + blub);
  if(clickedId == plebHero)
  {    console.log(clickedId)
     var heroName = butiful();
      document.getElementById("heroTitle").innerHTML = "you won! it was " + heroName;
      document.getElementById(plebHero).style.border = "3px solid green"; 
      omegaLul.src = blub; 
      document.getElementById("matchId").innerHTML = "Match Id: " + matchData.match_id;
      gameGoing = false;
  }

  else if (clickedId != plebHero && gameGoing)
  {
   document.getElementById(clickedId).style.border = "3px solid red"; 
     
  }
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
  console.log("the chosen random:" +random + " " + chosenMatch.match_id);
  return chosenMatch.match_id;
}


function randomizePlayer(data)
{
 var random = Math.floor((Math.random() * 10))
 var chosenPlayer = data.players[random];
 plebId = random;
 //console.log("the chosen playr" + random);
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
  console.log("NO ITEMS");  
    return true;
 }
 return false;
}

function ArrayIntoICon(data,array)
{
  var item = document.getElementById("items");
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
       item.innerHTML +='<img src="'+fullImgLink+'">';
    }
   }
    if(array[i]== 0)
    {
      item.innerHTML += '<img src="empty.png">';
    }
  }
}
