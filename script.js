 var plebHero;
 var plebHeroIMG;
 var dotaItems;
 var heroes; 
 var gameGoing = true;
 var plebItems;
 var matchData;

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
 //console.log( data[0]);
 getImagesStr(heroes);
 getImagesAgi(heroes);
 getImagesInt(heroes);
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
 var id = randomizeMatch(data);
 //console.log("I choose match number: " +id);
 chosenMatch += id;
 //console.log("the chosen match is" + chosenMatch);

 var request3 = new XMLHttpRequest();
  //console.log(chosenMatch);
 request3.open('GET', chosenMatch, true);
 request3.onreadystatechange =  function () 
{
 var nata = JSON.parse(this.response);
/* console.log("HELLO:" + chosenMatch);
 console.log( nata.players[0]);
 console.log(nata);*/
 var pleb = randomizePlayer(nata);
 /*console.log(pleb);
 console.log(nata);*/
  plebHero =  getHeroIDPlayer(pleb);
 plebItems = getArrayOfItems(pleb);

 ArrayIntoICon(dotaItems, plebItems);

 console.log( plebHeroIMG);

}

 request3.send();

}
  request2.send();

}

function reset()
{
  
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
      alert("UWON");
      gameGoing = false;
  }

  else if (clickedId != plebHero && gameGoing)
  {
   document.getElementById(clickedId).style.border = "3px solid red"; 
     
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
      console.log(data[a].id);
      var fullImgLink =  imgLink + data[a].img;
      item.innerHTML +='<img src="'+fullImgLink+'">';
    }
   }
  }
}

