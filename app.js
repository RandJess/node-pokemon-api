const express = require("express");
const app = express();
let { pokemons } = require("./source/db/mock-pokemon");
const pokemon = require("./source/models/pokemon")
const { success, getUniqueId } = require("./helper.js");
//recup les requettes faites par l'user et le faire console.log
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
// const fs = require("fs");
const sequelize= require("./source/db/sequelize")

sequelize.initDb()

const PORT = 3000;

// pokemons = JSON.parse(fs.readFileSync('mock-pokemon.js'));

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

//A NE PAS EFFACER!!
//Ceci fait exactement comme le morgan (recup les requettes faites par l'user et le faire console.log)
// app.use((req, res, next)=>{
//     console.log(`URL': ${req.url}`);
//     next()
// })

// app.get("/", (req, res) => {
//   res.send("Bienvenue");
// });

// app.get("/api/pokemons/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemon = pokemons.find((pokemon) => pokemon.id === id);
//   const message = "Trouvé✅";
//   res.json(success(message, pokemon));
// });

// app.get("/api/pokemons", (req, res) => {
//   // res.json(pokemons);
// });

//ajout pokemon
// app.post("/api/pokemons", (req, res) => {
//   const id = getUniqueId(pokemons);
//   const newPokemon = { ...req.body, ...{ id: id, created: new Date() } };
//   pokemons.push(newPokemon);
//   const messageAddPokCheck = `Le pokemon ${newPokemon.name} ajouté `;
//   res.json(success(messageAddPokCheck, newPokemon));
// });

// app.put("/api/pokemons/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonUpdated = { ...req.body, id: id };
//   pokemons = pokemons.map((pokemon) => {
//     return pokemon.id === id ? pokemonUpdated : pokemon;
//   });
//   const message = `${pokemonUpdated.name} est ajoutée avec succès`;
//   res.json(success(message, pokemonUpdated));
// });

// app.delete("/api/pokemons/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
//   pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
//   const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
//   //Pour que chaque modif ou changement effectuée dans la liste "json" pokemons soit impacter de maniere definitif.
//     // fs.writeFile("mock-pokemon.js", JSON.stringify(pokemons), (error) => {
//     // console.log(error);
//     // });
//   res.json(success(message, pokemonDeleted));
// });

//👇

require('./source/routes/findAllPokemons')(app)
//Trouvé un pokemon avec son identifiant
require('./source/routes/findByPk')(app)
//create new pokemon
require('./source/routes/createPokemon')(app)
//modifier
require('./source/routes/updatePokemon')(app)
//supprimer
require('./source/routes/deletePokemon')(app)

// __________👆________👆_______IMPORTATION____________________________________
// const abc = require('./source/root/findAllPokemons')
// const app =abc()
// require('./source/root/findAllPokemons')(app)
//👆


//Gestion statut d'erreur 404
app.use( ({res})=>{
  const messageErreur = "Qqchose s'est mal passé, essayer de changer l' url"
  res.status(404).json( {messageErreur} )
})

app.listen(PORT);
