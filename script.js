 var plebHero;
 var plebHeroIMG;

function fetchData()
{
 var linkToHeroImages = "https://api.opendota.com/api/heroStats";
 var linkToRandomMatches = "https://api.opendota.com/api/publicMatches";
 var chosenMatch = "https://api.opendota.com/api/matches/";
 var plebItems = [];

 var request = new XMLHttpRequest();
 request.open('GET', linkToHeroImages,false);

 var request2 = new XMLHttpRequest();
 request2.open('GET', linkToRandomMatches,false);

 request.onreadystatechange =   function () 
 {
 var data = JSON.parse(this.response);
 getImagesStr(data);
 getImagesAgi(data);
 getImagesInt(data);
 console.log(data,data[113].primary_attr);
 }

request2.onreadystatechange =  function () 
{
 var data = JSON.parse(this.response);
 var id = randomizeMatch(data);
 console.log("I choose match number: " +id);
 chosenMatch += id;
 console.log(chosenMatch);
 console.log(data);
}

console.log( "Assembled URL: " +chosenMatch);
 request.send();
 request2.send();
 var request3 = new XMLHttpRequest();
 request3.open('GET', chosenMatch, false);

request3.onreadystatechange =  function () 
{
 var data = JSON.parse(this.response);
 console.log(data);
 console.log(data.players[0]);
 var pleb = randomizePlayer(data);
 console.log(pleb.hero_id);
 plebHero =  getHeroIDPlayer(pleb);
 plebItems = getArrayOfItems(pleb);
 console.log("pleb hero" + plebHero);
 console.log("pleb"+ plebHeroIMG);
}
request3.send();

var request4 = new XMLHttpRequest();
request4.open('GET', "http://www.dota2.com/jsfeed/itemdata/?key=7C8B37F899203B917EA9CA4607F86FBE" ,false);

request4.onreadystatechange =  function () 
{
 var data = JSON.parse(this.response);
 ArrayIntoICon(data.itemdata, plebItems)
 console.log(data.itemdata);

}

request4.send();
 //request.send();
 //request2.send();

}

function reset()
{
  window.location.reload(); 
}

function getImagesStr(data)
{
  var container = document.getElementById("strength");
  var imgLink = "http://cdn.dota2.com/";
 console.log(imgLink);
 for(var i = 0; i < data.length; i++)
 {
   if(data[i].primary_attr == "str")
   {
    console.log("HI");
    var fullImgLink = imgLink + data[i].img;
    container.insertAdjacentHTML('beforeend', '<img class="hero" src="'+fullImgLink+'" id="'+data[i].hero_id+'" onclick="getId(this.id)">');
  

     ///"<img src="fullImgLink" id="data[i].hero_id">";
   }
 }
}

function getImagesAgi(data)
{
  var container = document.getElementById("agility");
  var imgLink = "http://cdn.dota2.com/";
 console.log(imgLink);
 for(var i = 0; i < data.length; i++)
 {
   if(data[i].primary_attr == "agi")
   {
    console.log("HI");
    var fullImgLink = imgLink + data[i].img;
    container.insertAdjacentHTML('beforeend', '<img class="hero" src="'+fullImgLink+'" id="'+data[i].hero_id+'" onclick="getId(this.id)">');
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
    console.log("HI");
    var fullImgLink = imgLink + data[i].img;
    container.insertAdjacentHTML('beforeend', '<img class="hero" src="'+fullImgLink+'" id="'+data[i].hero_id+'" onclick="getId(this.id)">');
     ///"<img src="fullImgLink" id="data[i].hero_id">";
  
   }
 }
}

function getId(clickedId,obj)
{
  var blub = document.getElementById(plebHero).src;
  var omegaLul = document.getElementById("plebHero");
  console.log("hello" + blub);
  if(clickedId == plebHero)
  {
      omegaLul.innerHTML = '<img src="'+blub+'" >';
      container.insertAdjacentHTML('beforeend', '<img class="hero" src="'+blub+'">'); 
      alert("UWON");

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
      var fullImgLink = imgLink + data[a].img;
      container.insertAdjacentHTML('beforeend', '<img src="'+fullImgLink+'">');
    }
   }
  }
}