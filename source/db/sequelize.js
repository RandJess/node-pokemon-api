// 🌙 On retire des "fonctionnalité " dans sequelize or que ce sont des objets, pour les requperer il faut
// le "remettre dans un crochet pour designer qu'ils sont des objets javascript" 

const { Sequelize, DataTypes }= require("sequelize")
let { pokemons } = require("./mock-pokemon");
const PokemonModel = require("../models/pokemon"); //le model pokemon sequelize
const UserModel = require("../models/user")
const bcryptjs = require ("bcryptjs")


const dev =  new Sequelize( //connexion a la BDD
  "pokemon",  //nom nouveau bdd qu'on crée 
  "jess", //identifiant
  "root123", //mdp
  {
    host : 'localhost',
    dialect : 'mysql',
    logging : false //eviter des affichages d'avertissement
  }
)
// module.exports= NODE_ENV=development;

// La BDD doit etree
const sequelize = process.env.NODE_ENV === 'production' ? new Sequelize(process.env.DB_URI) : dev;

//Vérifier si la connexion au BDD est réeussi
sequelize.authenticate()
.then(_ => console.log('🍑 Connexion au Bdd établie'))
.catch(error => console.error(`Voilà l'erreur ${error}`))


//SYNCHRONISATION A LA BDD :
// 1model sequelize = 1table BDD
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = ()=> {
    sequelize.sync({force : true })     //.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
    .then(
    _=>{
        console.log(" Le model a bien été syncronisé avec la BDD 🗯️")
        //Faire le lien entre le model    const Pokemon = ${pokemonModel(sequelize, DataTypes)} 
            //et la liste des mock-pokemon  ${pokemons} .
        pokemons.map(
            pokemon=>{
                Pokemon.create(
                    {
                        //mock-pockemon : pokemon.leAny@Model
                        name: pokemon.name,
                        hp: pokemon.hp,
                        cp: pokemon.cp,
                        picture: pokemon.picture,
                        //Coté Api rest c'est un tableau mais devrai etre des chaine de caractere en BDD.
                        //.join cree une chaine de caractere en concatenant les elements du tableau
                        types: pokemon.types
                    }
                )
            }
        )
        // NB: le encryptage mdp change a chaque modif qu'on fait .
        // To hash a password:
        bcryptjs.genSalt(10, (err, salt)=>{
            bcryptjs.hash("pwd1", salt, (err, hash) =>{             
                User.create({
                    username: "User1",
                    pwd: hash
                })
            });
        });
        
    })
}

module.exports = {
    initDb, Pokemon, User
}