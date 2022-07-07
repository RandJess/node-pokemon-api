const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const messageErreur = "La recupératoin du pokemon a échouée 😓";
          return res.status(500).json({ messageErreur, data: error });
        }
        return (
          Pokemon.destroy({
            where: { id: id },
          })
            //Promesse de Pokemon.destroy()
            .then((_) => {
              const message = `Le pokémon avec l'identifiant n°${pokemon.id} a bien été supprimé. 🚩`;
              res.json({ message, data: pokemon });
            })
        );
      })
      // Promesse de Pokemon.findByPk()
      .catch((error) => {
        const messageErreur =
          " Le pokemon n'existe pas ou a déjà été supprimé 😅";
        res.status(500).json({ messageErreur, data: error });
      });
  });
};
