const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize")

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    // Paramaetre de requette
    // On recherche un pokemon par son nom
    if (req.query.name) {
      const somethingSearched = req.query.name;   // Celui qui suis re.query qui doit etre ecris dans l'url : http://localhost:3000/api/pokemons?hp=21
      return Pokemon.findAndCountAll({ 
        where: 
        // { hp: somethingSearched } 
        {name :   // Propriete du model pokemon
          {[Op.like] : `%${somethingSearched}%`}    // somethingSearched: Critere de recherche
        }, limit:5
      })
        // le {count, rows} ===> pre-defini
      .then(  ({count, rows}  ) => {
        const msg = `Il y a ${count} qui correspond à votre recherche ${somethingSearched}`;
        res.json({ msg, data: rows });
      });
    } 
    // Trouver la liste si la recherche échou.
    else {
      Pokemon.findAll()
        .then((pokemons) => {
          const message = "Recup liste pokemons réussi";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const messageErreur =
            "La recupératoin de la liste des pokemons a échouée 😓";
          res.status(500).json({ messageErreur, data: error });
        });
    }
  });
};
