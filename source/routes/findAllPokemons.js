const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize")
const auth = require("../auth/auth")


module.exports = (app) => {
  app.get("/api/pokemons", auth, async (req, res) => {
    const somethingSearched = req.query.name;
         // http://localhost:3000/api/pokemons?name=a&limit=5
     if (somethingSearched) {
      if (somethingSearched.length >=2 ) {
         const {name, limit} = req.query
         return Pokemon.findAndCountAll({ 
           where: 
           {name :   //😱 name ici c la propriete dans model, mock-pokemon
             {[Op.like] : `%${somethingSearched}%`}    //🤫 somethingSearched: C que l'user recherche
           },
           limit: +limit || 2 ,
           order: ['name']
         })
           // le {count, rows} ===> pre-defini
         .then(  ({count, rows}  ) => {
           const msg = `Il y a ${count} qui correspond à votre recherche ${somethingSearched}`;
           res.json({ msg, data: rows });
         });
      }
      else {
        const msg =" Vous devez entrer au minimum 2 caratcéres pour lancer la recherche"
        res.status(400).json({ msg })
      }
    } 
  
    // Trouver la liste si la recherche échou.
    else {
      Pokemon.findAll(  {order: ['name']} )
        .then((pokemons) => {
          const message = "Récupération liste pokemons réussi";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const messageErreur = "La recupératoin de la liste des pokemons a échouée 😓";
          res.status(500).json({ messageErreur, data: error });
        });
    }

  });

};
