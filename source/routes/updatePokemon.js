const { Pokemon } = require("../db/sequelize");
//Importe l' ORM Sequelize
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id },
    })
      // --------🤞promesse Pokemon.findByPk() --------------------
      .then((_) => {
        return Pokemon.findByPk(id).then((pokemon) => {
          //😮 Error si le pokemon a déjà été supprimé .
          if (pokemon === null) {
            const messageErreur = `La recupératoin du pokemon Id: ${id} a échouée 😓`;
            return res.status(500).json({ messageErreur, data: error });
          }
          const message = `Le pokémon ${pokemon.name} a bien été modifié. ⏰`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res
            .status(400)
            .json({ messageErreur: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res
            .status(400)
            .json({ messageErreur: error.message, data: error });
        }
        const messageErreur = `La modification de ce pokemon Id: ${id} a échouée 😓`;
        res.status(500).json({ messageErreur, data: error });
      });
  });
  // -------------------------------------------
};
