class Pokemon  {

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
    status = {burned : false, stored : false, berries : 5, level : 1};
    // burned = false
    // stored = false
    // berries = 5
    // level = 1
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
        if(param == "hungry" && this.stat.hungry + 10 < 100 && this.status.berries > 0) {
            console.log("OK")
            this.stat.hungry += 10;
            this.status.berries--;
        } 
        if(param == "fun") {
            let fpkmn = new FoePokemon();
            this.stat.stamina -= fpkmn.damage;
            this.gainXp(fpkmn);
            if(this.getRandomInt(3) == 2) {
                this.status.burned = true;
                document.getElementById("status").classList.remove("d-none");
                this.verifGameOver();
            }
            if(this.getRandomInt(2) == 1) this.status.berries++;
            if(this.stat.fun + 10 < 100) this.stat.fun += 10;
            else this.stat.fun = 100;
            
        }
        if (param == "stockPc") {
            let buttonHungry = document.getElementById("buttonHungry");
            let buttonFun = document.getElementById("buttonFun");
            document.getElementById("mainFrame").classList.toggle("night");
            if (this.status.stored) {
                this.status.stored = false;
                document.getElementById("buttonStockPc").innerHTML = "Emmener au centre pokémon";
                buttonHungry.disabled = false;
                buttonFun.disabled = false;
            } else {
                this.status.stored = true;
                this.status.burned = false;
                document.getElementById("status").classList.add("d-none");
                document.getElementById("buttonStockPc").innerHTML = "Retirer du centre pokémon";
                buttonHungry.disabled = true;
                buttonFun.disabled = true;
            }
        }
    }
    // courbe d'apprentissage 
    // plus le niveau est elevé, moins on gagne d'xp

    gainXp(fpkmn) {
        let coeff = parseInt(fpkmn.exp_gived) - parseInt(this.status.level) + 1;
        if(coeff < 1) coeff = 1;
        console.log(coeff)
        this.stat.exp += coeff;
        if(this.stat.exp >= 100) {
            this.status.level += 1;
            this.stat.exp = this.stat.exp - 100;
        } 
        document.getElementById("cursor").style.width=this.stat.exp * 2 + "px";
    }
    
    verifGameOver() {
        if(this.stat.hungry <= 0 || this.stat.stamina <= 0 || this.stat.fun <= 0 ) {
                document.getElementById("gameOver").innerHTML = "GAME OVER"
                intervalManager(false);

                for (let i in this.button) {

                    let el = this.button[i],
                    elClone = el.cloneNode(true);
                    el.parentNode.replaceChild(elClone, el);

                    console.log(this.button[i])
                    // this.button[i].addEventListener("click", function(event) {
                    //     event.stopImmediatePropagation();
                    // }, true);
                }
     
            } 
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}
