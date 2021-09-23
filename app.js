window.onload = function (){
    // API METEO
    //api();
}

let pokemon = new Pokemon();
console.log(pokemon);
function api() {
    // Make a request for a user with a given ID
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=montpellier&appid=dced8c7e19301276fcf28e033a299134')
    .then(function (r) {
        // handle success
        console.log(r);
        console.log(r.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}
setInterval(() => {
    //api();
}, 1000000);

let timer = 1000;
var interval = null;
intervalManager(true)
function intervalManager(flag) {
    if(flag) {
        interval = setInterval(() =>{
            // display level
            document.getElementById("level").innerHTML = "Niveau : "+ pokemon.level
            for(let i in pokemon.stat) {
                if(i == "stamina" && pokemon.stored && pokemon.stat[i] + 5 < 100) pokemon.stat[i] += 5;
                else if(i == "stamina" && pokemon.burned) pokemon.stat[i] -= 5;
                else if (pokemon.stored &&i != "exp" ) pokemon.stat[i] -= 5;
                else if(i !="exp") pokemon.stat[i]--;
                pokemon.divs[i].innerHTML = pokemon.stat[i] + " %";
            }
            document.getElementById("berries").innerHTML = pokemon.berries + " baies"
            pokemon.verifGameOver();
            }, timer)
    } 
    else clearInterval(interval);
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