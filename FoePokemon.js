class FoePokemon  {
    name;
    level;
    img;
    damage;
    exp_gived;

    constructor() {
        let foePkmn = this.foePokemon[this.getRandomInt(this.foePokemon.length)];
        this.name = foePkmn.name;
        this.level = foePkmn.level;
        this.img = foePkmn.img;
        this.damage = foePkmn.damage;
        this.exp_gived = foePkmn.exp_gived;

        console.log(foePkmn)
        document.getElementById("foePkmn").setAttribute("src", "img/"+foePkmn.img);
        setTimeout(function(){ 
            document.getElementById("foePkmn").setAttribute("src", "img/herb.jpg");
        }, 1000);
    }
    
    foePokemon = [
        {"name" : "miaous",
         "level" : 1,
        "img" : "miaous.jpg",
        "damage" : 4,
        "exp_gived" : 10},
        {"name" : "ectoplasma",
         "level" : 3,
        "img" : "ectoplasma.jpg",
        "damage" : 6,
        "exp_gived" : 30},
        {"name" : "roucarnage",
         "level" : 3,
        "img" : "roucarnage.jpg",
        "damage" : 6,
        "exp_gived" : 20},

    ]

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}