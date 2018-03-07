 var plebHero;
 var plebHeroIMG;
 var dotaItems;
 var heroes; 
 var gameGoing = true;
 var plebItems;
 var matchData;
 var pleb;
var matches;
var id;
var plebHeroName = "";

function loading() {
  fetchData();
    myVar = setTimeout(showPage, 3000);
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
 console.log(data.itemdata);
}

 request4.send();
request2.onreadystatechange =  function () 
{
 var data = JSON.parse(this.response);
 matches = data;
 id = randomizeMatch(matches);
 console.log("I choose match number: " +id);
 chosenMatch += id;
 //console.log("the chosen match is" + chosenMatch);

 var request3 = new XMLHttpRequest();
  //console.log(chosenMatch);
 request3.open('GET', chosenMatch, true);
 request3.onreadystatechange =  function () 
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
 console.log(plebItems);
 if(plebItems.reduce((a, b) => a + b, 0) == 0)
 {
  pleb = randomizePlayer(matchData);
  plebHero =  getHeroIDPlayer(pleb);
  plebItems = getArrayOfItems(pleb);
 }
   ArrayIntoICon(dotaItems, plebItems);
    plebHeroName =  getHeroName(heroes);

}

function reset()
{
 chosenMatch = "https://api.opendota.com/api/matches/"; 
 var id = randomizeMatch(matches);
 document.getElementById("plebHer").src ="heroBefore.png"
 plebItems.length = 0;
 console.log(plebItems);
 document.getElementById("items").innerHTML = "";
 chosenMatch += id;
 var heroImages = document.getElementsByClassName("hero");
 loopResetImg();
 console.log(heroImages.style);
   pleb = randomizePlayer(matchData);
 plebHero =  getHeroIDPlayer(pleb);
 plebItems = getArrayOfItems(pleb);
   ArrayIntoICon(dotaItems, plebItems);
 plebHeroName =  getHeroName(heroes);  
  document.getElementById("matchId").innerHTML = "";
      document.getElementById("heroName").innerHTML ="";
      document.getElementById("winnerText").style.display = "none";
      gameGoing = true;

}

function getImagesStr(data)
{
  var container = document.getElementById("strength");
  var imgLink = "http://cdn.dota2.com/";
 console.log(imgLink);
 //console.log(data)
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
 console.log(imgLink);
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
  {   
      document.getElementById(plebHero).style.border = "3px solid green"; 
      omegaLul.src = blub; 
      document.getElementById("matchId").innerHTML = "match id: " +  id;
      console.log(clickedId,heroes[plebHero -1]);
      document.getElementById("heroName").innerHTML ="It was: " + plebHeroName + "!";
      document.getElementById("winnerText").style.display = "inline-block";
      gameGoing = false;
  }

  else if (clickedId != plebHero && gameGoing)
  {
   document.getElementById(clickedId).style.border = "3px solid red"; 
     
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
  var chosenMatch = data[Math.floor((Math.random() * 100))];
  console.log(chosenMatch);
  return chosenMatch.match_id;
}


function randomizePlayer(data)
{
  console.log(data);
 var chosenPlayer = data.players[Math.floor((Math.random() * 10))];
 console.log(chosenPlayer);
 return chosenPlayer;
}

function getHeroIDPlayer(obj)
{
  return obj.hero_id;
}

function getHeroName(obj)
{
  
  for(var i = 0; i < obj.length; i++)
 {
   if(obj[i].id == plebHero)
   {
     console.log(obj[i]);
      return obj[i].localized_name;
   }
    
 }
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
  console.log(arrOfItems);
  return arrOfItems;
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
       var fullImgLink = imgLink + "trident_lg.png?3";
      }
      item.innerHTML +='<img src="'+fullImgLink+'">';

    }
   }
  }
}

