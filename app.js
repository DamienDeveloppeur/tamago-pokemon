window.onload = function (){
    // API METEO

}

function api() {
    var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE) {   
             if (xmlhttp.status == 200) {
                 console.log(xmlhttp.responseText);
             }
             else if (xmlhttp.status == 400) {
                alert('There was an error 400');
             }
             else {
                 alert('something else other than 200 was returned');
             }
          }
      };
      xmlhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=montpellier&appid=dced8c7e19301276fcf28e033a299134", true);
      xmlhttp.send();
  }


api();
let stat = {hungry: 100, stamina: 100, fun : 50, exp : 0};
const divs = {
    hungry : document.getElementById("stat_hungry"),
    stamina : document.getElementById("stat_stamina"),
    fun : document.getElementById("stat_fun"),
    exp : document.getElementById("stat_exp")
}
const foePokemon = [
    {"name" : "miaous",
     "level" : 1,
    "img" : "miaous.jpg",
    "damage" : 4}
]

let burned = false,stored = false, berries = 5, level = 1;
let timer = 1000;
var interval = null;
intervalManager(true)
function intervalManager(flag) {
    if(flag) {
        interval = setInterval(() =>{
            // display level
            document.getElementById("level").innerHTML = "Niveau : "+ level
            for(let i in stat) {
                if(i == "stamina" && stored && stat[i] + 5 < 100) stat[i] += 5;
                else if(i == "stamina" && burned) stat[i] -= 5;
                else if (stored &&i != "exp" ) stat[i] -= 5;
                else if(i !="exp") stat[i]--;
                divs[i].innerHTML = stat[i] + " %";
            }
            document.getElementById("berries").innerHTML = berries + " baies"
            verifGameOver();
            }, timer)
    } 
    else clearInterval(interval);
 }

function actionTama(param) {
    if(param == "hungry" && stat.hungry + 10 < 100 && berries > 0) {
        stat.hungry += 10;
        berries--;
    } 
    if(param == "fun") {
        if(stat.exp == 90) {
            level += 1;
            stat.exp = 0;
        } else {
            stat.exp += 10;
        }
        
        // select random pokémon
        let max = foePokemon.length;
        console.log(max)
        if(getRandomInt(3) == 2) {
            burned = true;
            document.getElementById("status").classList.remove("d-none");
            verifGameOver();
        }
        if(stat.fun + 10 < 100) {
            stat.fun += 10;
            if(getRandomInt(10) == 4) berries++;
        } else {
            stat.fun = 100;
        }
    }
}

function closeLight(){
    let buttonHungry = document.getElementById("buttonHungry");
    let buttonFun = document.getElementById("buttonFun");
    document.getElementById("mainFrame").classList.toggle("night");
    if (stored) {
        stored = false;
        document.getElementById("buttonStockPc").innerHTML = "Emmener au centre pokémon";

        buttonHungry.disabled = false;
        buttonFun.disabled = false;
       
        buttonHungry.setAttribute("onclick", "actionTama('hungry')")
        buttonFun.setAttribute("onclick", "actionTama('fun')")
    } else {
        stored = true;
        burned = false;
        document.getElementById("status").classList.add("d-none");
        document.getElementById("buttonStockPc").innerHTML = "Retirer du centre pokémon";

        buttonHungry.disabled = true;
        buttonFun.disabled = true;
        
        buttonHungry.setAttribute("onclick", "")
        buttonFun.setAttribute("onclick", "")
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function save() {
    localStorage.setItem('STATS', JSON.stringify(stat));
    localStorage.setItem('BERRIES', JSON.stringify(berries));
}

function getSave(){
    intervalManager(false);
    let data = localStorage.getItem('STATS')
    stat = JSON.parse(data);
    let berriesJSON = localStorage.getItem('BERRIES')
    berries = JSON.parse(berriesJSON)
    document.getElementById("gameOver").innerHTML = ""
    intervalManager(true);
}

function verifGameOver() {
    if(stat.hungry == 0 || stat.hungry < 0 ||
        stat.stamina == 0 || stat.stamina < 0 ||
        stat.fun == 0 || stat.fun < 0) {
            document.getElementById("gameOver").innerHTML = "GAME OVER"
            intervalManager(false);
        } 
}