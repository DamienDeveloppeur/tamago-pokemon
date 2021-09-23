window.onload = function (){
    // API METEO
    api();
}

let pokemon = new Pokemon();
console.log(pokemon);
function api() {
    // Make a request for a user with a given ID
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=montpellier&appid=dced8c7e19301276fcf28e033a299134')
    .then(function (r) {
        console.log(r);
        console.log(r.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
    });
}
setInterval(() => {
    //api();
}, 100000000);

let timer = 1000;
var interval = null;
intervalManager(true)
function intervalManager(flag) {
    if(flag) {
        interval = setInterval(() =>{
            // display level
            document.getElementById("level").innerHTML = "Niveau : "+ pokemon.status.level
            for(let i in pokemon.stat) {
                // soin 
                if(i == "stamina" && pokemon.status.stored && pokemon.stat[i] + 5 <= 100) pokemon.stat[i] += 5;
                else if (i == "stamina" && pokemon.status.stored && pokemon.stat[i] + 5 > 100) pokemon.stat[i] = 100;
                // burned
                else if(i == "stamina" && pokemon.status.burned) pokemon.stat[i] -= 9;
                // others stats down most quickly 
                else if (pokemon.status.stored && i != "exp") pokemon.stat[i] -= 5;
                else if(i !="exp" && i !="stamina") pokemon.stat[i]--;
                //pokemon.divs[i].innerHTML = pokemon.stat[i] + " %";
                pokemon.divs[i].style.width= pokemon.stat[i] + "px";
            }
            document.getElementById("berries").innerHTML = pokemon.status.berries + " baies"
            pokemon.verifGameOver();
            }, timer)
    } 
    else clearInterval(interval);
}

function save() {
    localStorage.setItem('STATS', JSON.stringify(pokemon.stat));
    localStorage.setItem('BERRIES', JSON.stringify(pokemon.status));
}

function getSave(){
    intervalManager(false);
    let data = localStorage.getItem('STATS')
    pokemon.stat = JSON.parse(data);
    let berriesJSON = localStorage.getItem('BERRIES')
    pokemon.status = JSON.parse(berriesJSON)
    document.getElementById("gameOver").innerHTML = ""
    intervalManager(true);
}