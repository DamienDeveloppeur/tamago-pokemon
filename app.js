// window.onload = function ()
// {

// };
const stat = {hungry: 100, stamina: 100, fun : 10};
const divs = {
    hungry : document.getElementById("stat_hungry"),
    stamina : document.getElementById("stat_stamina"),
    fun : document.getElementById("stat_fun"),
}
var burned = false;
var stored = false;
var timer = 1000;

const interval = setInterval(() =>{
    for(let i in stat) {
        console.log(burned)
        if(i == "stamina" && stored && stat[i] + 5 < 100) {
            stat[i] += 5;
        } else if(i == "stamina" && burned) {
            stat[i] -= 5;
        } else {
            stat[i]--;
        }
        divs[i].innerHTML = stat[i];
    }
    verifGameOver();
    }, timer)

function actionTama(param) {
    if(param == "hungry" && stat.hungry + 10 < 100) {
        stat.hungry += 10;
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
function verifGameOver() {
    if(stat.hungry == 0 || stat.hungry < 0 ||
        stat.stamina == 0 || stat.stamina < 0 ||
        stat.fun == 0 || stat.fun < 0) {
            document.getElementById("mainFrame").innerHTML = "GAME OVER"
        } 
}
function closeLight(){
    if (document.querySelector("#mainFrame").classList.contains('night')) {
        stored = false;
        document.getElementById("mainFrame").classList.remove("night");
        document.getElementById("buttonStockPc").innerHTML = "Emmener au centre pokémon";
    } else {
        stored = true;
        burned = false;
        document.getElementById("status").classList.add("d-none");
        document.getElementById("mainFrame").classList.add("night");
        document.getElementById("buttonStockPc").innerHTML = "Retirer du centre pokémon";
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}