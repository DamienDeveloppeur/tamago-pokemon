window.onload = function (){
    // API METEO
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
        xmlhttp.open("GET", "api.openweathermap.org/data/2.5/weather?q=montpellier&appid=dced8c7e19301276fcf28e033a299134", true);
        xmlhttp.send();
 
}
let stat = {hungry: 100, stamina: 100, fun : 50, exp : 0};
const divs = {
    hungry : document.getElementById("stat_hungry"),
    stamina : document.getElementById("stat_stamina"),
    fun : document.getElementById("stat_fun"),
    exp : document.getElementById("stat_exp")
}

let burned = false;
let stored = false;
let timer = 1000;
let berries = 5;
let level = 1;

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
        console.log(stat.exp)
        if(stat.exp == 90) {
            level += 1;
            stat.exp = 0;
        } else {
            stat.exp += 10;
        }
        
        if(stat.fun + 10 < 100) {
            stat.fun += 10;
            if(getRandomInt(10) == 4) berries++;
            if(getRandomInt(3) == 2) {
                burned = true;
                document.getElementById("status").classList.remove("d-none");
                verifGameOver();
            }
        } else {
            stat.fun = 100;
        }
    }
}

function closeLight(){
    if (document.querySelector("#mainFrame").classList.contains('night')) {
        stored = false;
        document.getElementById("mainFrame").classList.remove("night");
        document.getElementById("buttonStockPc").innerHTML = "Emmener au centre pokémon";

        document.getElementById("buttonHungry").disabled = false;
        document.getElementById("buttonFun").disabled = false;
       
        document.getElementById("buttonHungry").setAttribute("onclick", "actionTama('hungry')")
        document.getElementById("buttonFun").setAttribute("onclick", "actionTama('fun')")
    } else {
        stored = true;
        burned = false;
        document.getElementById("status").classList.add("d-none");
        document.getElementById("mainFrame").classList.add("night");
        document.getElementById("buttonStockPc").innerHTML = "Retirer du centre pokémon";

        document.getElementById("buttonHungry").disabled = true;
        document.getElementById("buttonFun").disabled = true;
        
        document.getElementById("buttonHungry").setAttribute("onclick", "")
        document.getElementById("buttonFun").setAttribute("onclick", "")
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