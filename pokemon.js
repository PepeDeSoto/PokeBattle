let container = document.querySelector(".container");
let prueba;
const types = {};
const filterTypes = {}
let pokemonTypes1=[];
let pokemonTypes2=[];


//ARREGLAR FUNCION PARA COMPRAR LOS TIPOS
// const battlePokemon = () =>{

//     for (let i = 0;i < pokemonTypes1.length-1;i++) {
//         let search = pokemonTypes1[i];
//         // console.log(types[search]);
//             for(let e = 0;e < 18;e++){
//                 console.log("soy de agua")
//                 console.log(types[search].double_damage_from[1])
//                 console.log(types[search].double_damage_from[2])
//                 //ver si el pokemon 2 contiene algun tipo
//                 console.log(pokemonTypes2.includes("fire"));
//                 console.log(types[search].double_damage_from[e].name);
//                 if(pokemonTypes2.includes(types[search].double_damage_from[e].name)){
//                     pokemonTypes2[2].attack += pokemonTypes2[2].special-attack;
//                 }else if(pokemonTypes2.includes(types[search].half_damage_from[e].name)){
//                     pokemonTypes2[2].defense += pokemonTypes2[2].special-defense;
//                 }
//                 try {
//                     if(pokemonTypes2.includes(types[search].no_damage_from[e].name)){
//                         pokemonTypes2[2].attack =10000000;
//                     }
//                 } catch (error) {
//                     console.log("No contiene no recibir daño desde...")
//                 }
//                 //ver si el pokemon 1 contiene algun tipo
//                 if(pokemonTypes1.includes(types[search].double_damage_from[e].name)){
//                     pokemonTypes1[2].attack += pokemonTypes1[2].special-attack;
//                 }else if(pokemonTypes1.includes(types[search].half_damage_from[e].name)){
//                     pokemonTypes1[2].defense += pokemonTypes1[2].special-defense;
//                 }
//                 try {
//                     if(pokemonTypes1.includes(types[search].no_damage_from[e].name)){
//                         pokemonTypes2[2].attack =10000000;
//                     }
//                 } catch (error) {
//                     console.log("No contiene no dañar x tipos...")
//                 }
//             }
            
//         // for(e in types.search){
//         //     if(types.pokemonTypes1[i][e]){
//         //         pokemon
//         //     }
//         // }
        
//     }
// };
//si consigo sacar battlePOkemon esta funcion no seria necesaria
// const functionFilterTypes = () =>{
//         for(type in types){
//             console.log(type)
//         }

// }


const captureType = ()=>{
    for(let i = 1;i <= 18;i++){
        fetch(`https://pokeapi.co/api/v2/type/${i}`)
            .then(res => res.json())
            .then(type=>{
                types[type.name] = type.damage_relations;
        });
    }
    
};

captureType();



//--------------------------------------CREATE POKEMON----------------------------------------------


const capturePokemon = (id,num) =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data=>{
        
        createPokemon(data,num);
    })
}

const powerPokemon = (pokemon,num)=>{
    
    for(type in pokemon.types){
        // console.log(pokemon.types[0].type.name);
        if (num == 1){
            pokemonTypes1[type] = pokemon.types[type].type.name;
        }else if(num == 2){
            pokemonTypes2[type] = pokemon.types[type].type.name;
            
        }
    }
    if (num == 1){
        pokemonTypes1.push({"hp":pokemon.stats[0].base_stat, "attack": pokemon.stats[1].base_stat, "defense": pokemon.stats[2].base_stat, "special-attack": pokemon.stats[3].base_stat, "special-defese": pokemon.stats[4].base_stat, "speed": pokemon.stats[5].base_stat});
    }else if(num == 2){
        pokemonTypes2.push({"hp":pokemon.stats[0].base_stat, "attack": pokemon.stats[1].base_stat, "defense": pokemon.stats[2].base_stat, "special-attack": pokemon.stats[3].base_stat, "special-defese": pokemon.stats[4].base_stat, "speed": pokemon.stats[5].base_stat});
    }

}

const createPokemon = (pokemon,num) =>{
    let item = container.querySelector(`#pokemon${num}`);
    prueba = pokemon;
    
    let imagePokemon = item.getElementsByTagName("img")[0];
    imagePokemon.setAttribute("src",pokemon.sprites.front_default);

    let namePokemon = item.getElementsByTagName("b")[0];
    namePokemon.textContent = pokemon.name.toUpperCase();
    let hp = item.getElementsByTagName("p")[1];
    hp.textContent = `HP: ${pokemon.stats[0].base_stat}`;
    let attack = item.getElementsByTagName("p")[2];
    attack.textContent =`Ataque: ${pokemon.stats[1].base_stat}`;
    let defense = item.getElementsByTagName("p")[3];
    defense.textContent = `Defensa: ${pokemon.stats[2].base_stat}`;
    powerPokemon(pokemon,num);
    //battlePokemon();
    //functionFilterTypes();

    animation(num);
}

const pokemonRandom = ()=>{
    pokemonTypes1 = [];
    pokemonTypes2 = [];
    let pokemon1 = Math.round(Math.random()*150);
    let pokemon2 = Math.round(Math.random()*150);
    capturePokemon(pokemon1,1); //MODIFICAR Y PONER POKEMON 1 Y POKEMON 2 
    //86 126
    capturePokemon(pokemon2,2);
}


const animation = (num)=>{
    let card = document.querySelector(`.card${num}`);
    let containerAnimation = document.querySelector(".container");
    let box = num-1;
    console.log("soy el box" + box);
    
    //Items
    let abilities = document.querySelectorAll(".abilities");

    let img = document.querySelectorAll(".img-pokemon img");
    let name = document.querySelectorAll(".name-pokemon b");
    let hp = document.querySelectorAll(".hp-pokemon");
    let attack = document.querySelectorAll(".attack-pokemon");
    let defend = document.querySelectorAll(".defend-pokemon");
    
    console.log(abilities[box]);
    
    
    //Moving Animation Event
    card.addEventListener("mousemove",(e)=>{
        let yAxis = ((window.innerWidth / 2 - e.pageX )/ 20);
        let xAxis = ((window.innerHeight / 2 - e.pageY)) / 20;
        card.style.transform = `rotateY(${yAxis}deg) rotateX(${xAxis}deg)`;
    });
    
    //Animate In
    card.addEventListener("mouseenter",(e)=>{
        card.style.transition="none";
        abilities[box].style.background= "#ff000096";
        //Popout
            abilities[box].style.transform = "translateZ(150px)";
        if(box == 0){
            
            img[box].style.transform = "translateZ(200px) rotateY(180deg)";
        }else{
            img[box].style.transform = "translateZ(200px)";
        }
    });
    
    //Animate Out
    card.addEventListener("mouseleave",(e) =>{
        card.style.transition = "all 0.5s ease";
        card.style.transform = `rotateY(0) rotateX(0)`;
        abilities[box].style.background= " #b9b9b996";
        //Popback
        abilities[box].style.transform = "translateZ(0)"
        if(box == 0){
            img[box].style.transform = "translateZ(10px) rotateY(180deg)";
        }else{
            img[box].style.transform = "translateZ(10px)";
        }
       
    });
    // card.addEventListener("click",(e) =>{
    //     card.style.boxShadow = "0px 5px 5px 5px rgba(0, 255, 64, 0.75)";
    //     abilities[box].style.background= "#33ff0096;

    //     card[box].style.webkitBoxShadow= "0px 0px 10px 0px rgba(0,0,0,0.75)";
    //     card[box].style.mozBoxShadow= "0px 0px 10px 0px rgba(0,0,0,0.75)";
    // // });
}
