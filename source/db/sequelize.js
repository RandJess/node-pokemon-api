const { Sequelize, DataTypes }= require("sequelize")
const PokemonModel = require("../models/pokemon"); //le model pokemon sequelize
let { pokemons } = require("./mock-pokemon");


const sequelize =  new Sequelize( //connexion a la BDD
  "pokemon",  //nom nouveau bdd qu'on crée 
  "jess", //identifiant
  "root123", //mdp
  {
    host : 'localhost',
    dialect : 'mariadb',
    dialectOptions : {
      timezone : 'Etc/GMT-2' //eviter des affichages d'avertissement
    },
    logging : false //eviter des affichages d'avertissement
  }
) 

//Vérifier si la connexion au BDD est réeussi
sequelize.authenticate()
.then(_ => console.log('🍑 Connexion au Bdd établie'))
.catch(error => console.error(`Voilà l'erreur ${error}`))


// 1model sequelize = 1table BDD
//SYNCHRONISATION A LA BDD
const Pokemon = PokemonModel(sequelize, DataTypes)
const initDb = ()=> {
    sequelize.sync({force : true })
    .then(
    _=>{
        console.log(" Le model a bien été syncronisé avec la BDD 🗯️")
        //creer une instance pokemon
        pokemons.map(
            pokemon=>{
                Pokemon.create(
                    {
                        name: pokemon.name,
                        hp: pokemon.hp,
                        cp: pokemon.cp,
                        picture: pokemon.picture,
                        //Coté Api rest c'est un tableau mais devrai etre des chaine de caractere en BDD.
                        //.join cree une chaine de caractere en concatenant les elements du tableau
                        types: pokemon.types
                    }
                ).then( )
            }
        )
    })
}

module.exports = {
    initDb, Pokemon
}