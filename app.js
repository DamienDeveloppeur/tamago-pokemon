// window.onload = function ()
// {

// };
let stat = {hungry: 3, stamina: 100, fun : 100};
const divs = {
    hungry : document.getElementById("stat_hungry"),
    stamina : document.getElementById("stat_stamina"),
    fun : document.getElementById("stat_fun"),
}
//var status = {burned = false, stored = false};
let burned = false;
let stored = false;
let timer = 1000;
let berries = 5;
let pokedollar = 50;

const interval = setInterval(() =>{
    for(let i in stat) {
        if(i == "stamina" && stored && stat[i] + 5 < 100) {
            stat[i] += 5;
        } else if(i == "stamina" && burned) {
            stat[i] -= 5;
        } else if (stored) {
            stat[i] -= 5;
        } else {
            stat[i]--;
        }
        divs[i].innerHTML = stat[i] + " %";
    }
    document.getElementById("berries").innerHTML = berries + " baies"
    verifGameOver();
    }, timer)

function actionTama(param) {
    if(param == "hungry" && stat.hungry + 10 < 100 && berries > 0) {
        stat.hungry += 10;
        berries--;
    } 
    if(param == "fun" && stat.fun + 10 < 100) {
        stat.fun += 10;
        let random = getRandomInt(3);
        if(random == 2) {
            burned = true;
            document.getElementById("status").classList.remove("d-none");
            verifGameOver();
        }
    } 
    // if(param == "stamina" && document.querySelector("#mainFrame").classList.contains('night') && stat.stamina +10 < 100) {
    //     stat.stamina += 10;
    //     burned = false;
    //     document.getElementById("status").classList.add("d-none");
    // } 
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
// JSON.stringify(stat)
// JSON.parse()
function save() {
    localStorage.setItem('STATS', JSON.stringify(stat));
}

function getSave(){
    let data = localStorage.getItem('STATS')
    console.log(JSON.parse(data))
    stat = JSON.parse(data);
}

function verifGameOver() {
    if(stat.hungry == 0 || stat.hungry < 0 ||
        stat.stamina == 0 || stat.stamina < 0 ||
        stat.fun == 0 || stat.fun < 0) {
            document.getElementById("gameOver").innerHTML = "GAME OVER"
            clearInterval(interval);
        } 
}