function fetchData()
{
 var linkToHeroImages = "https://api.opendota.com/api/heroStats";
 var linkToRandomMatches = "https://api.opendota.com/api/publicMatches";

 var request = new XMLHttpRequest();
 request.open('GET', linkToHeroImages,true);

 var request2 = new XMLHttpRequest();
 request2.open('GET', linkToRandomMatches,true);

 //var request3 = new XMLHttpRequest();
 //request3.open('GET', recentMatches, true);

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
 console.log(data);
}

/*request3.onreadystatechange =  function () 
{
 var data = JSON.parse(this.response);
}*/

 request.send();
 request2.send();
 //request3.send();
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
    container.insertAdjacentHTML('beforeend', '<img src="'+fullImgLink+'" id="'+data[i].hero_id+'" onclick="getId()">');
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
    container.insertAdjacentHTML('beforeend', '<img src="'+fullImgLink+'" id="'+data[i].hero_id+'" onclick="getId()">');
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
    container.insertAdjacentHTML('beforeend', '<img src="'+fullImgLink+'" id="'+data[i].hero_id+'" onclick="getId()">');
     ///"<img src="fullImgLink" id="data[i].hero_id">";
   }
 }
}

function getId()
{
  console.log("beep this works");
}
