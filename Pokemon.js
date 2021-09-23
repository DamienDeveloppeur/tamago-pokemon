class Pokemon {

    stat = {hungry: 100, stamina: 100, fun : 50, exp : 0};
    divs = {
        hungry : document.getElementById("stat_hungry"),
        stamina : document.getElementById("stat_stamina"),
        fun : document.getElementById("stat_fun"),
        exp : document.getElementById("stat_exp")
    }
    button = {
        hungry : document.getElementById("buttonHungry"),
        fun : document.getElementById("buttonFun"),
        stockPc : document.getElementById("buttonStockPc"),
    }
    burned = false
    stored = false
    berries = 5
    level = 1
    // add listener click 
    constructor(){
        for (let i in this.button) {
            this.button[i].addEventListener("click",() =>
                this.actionTama(i)
            ); 
        }
    }
  
    actionTama(param) {
        console.log(param)
        if(param == "hungry" && this.stat.hungry + 10 < 100 && this.berries > 0) {
            console.log("OK")
            this.stat.hungry += 10;
            this.berries--;
        } 
        if(param == "fun") {
            let fpkmn = new FoePokemon();
            this.stat.exp += fpkmn.exp_gived;
            if(this.stat.exp >= 100) {
                this.level += 1;
                this.stat.exp = this.stat.exp - 100;
            } 
            document.getElementById("cursor").style.width=this.stat.exp * 2 + "px";
            // select random pokémon
            //let max = foePokemon.length;
            
            if(this.getRandomInt(3) == 2) {
                this.burned = true;
                document.getElementById("status").classList.remove("d-none");
                this.verifGameOver();
            }
            if(this.getRandomInt(4) == 2) this.berries++;
            if(this.stat.fun + 10 < 100) this.stat.fun += 10;
            else this.stat.fun = 100;
            
        }
        if (param == "stockPc") {
            let buttonHungry = document.getElementById("buttonHungry");
            let buttonFun = document.getElementById("buttonFun");
            document.getElementById("mainFrame").classList.toggle("night");
            if (this.stored) {
                this.stored = false;
                document.getElementById("buttonStockPc").innerHTML = "Emmener au centre pokémon";
        
                buttonHungry.disabled = false;
                buttonFun.disabled = false;
               
                buttonHungry.setAttribute("onclick", "actionTama('hungry')")
                buttonFun.setAttribute("onclick", "actionTama('fun')")
            } else {
                this.stored = true;
                this.burned = false;
                document.getElementById("status").classList.add("d-none");
                document.getElementById("buttonStockPc").innerHTML = "Retirer du centre pokémon";
        
                buttonHungry.disabled = true;
                buttonFun.disabled = true;
                
                buttonHungry.setAttribute("onclick", "")
                buttonFun.setAttribute("onclick", "")
            }
        }
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    verifGameOver() {
        if(this.stat.hungry <= 0 || this.stat.stamina <= 0 || this.stat.fun <= 0 ) {
                document.getElementById("gameOver").innerHTML = "GAME OVER"
                intervalManager(false);
            } 
    }
}
