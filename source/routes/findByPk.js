const { Pokemon }= require('../db/sequelize')
const auth = require("../auth/auth")

module.exports= (app)=>{
    app.get('/api/pokemons/:id',auth, (req, res)=>{
        //+ findByPk ne fait aucune difference entre "1" et 1
        //+ 🥊PAS besoin de parserInt le req.params.id
        //findByPk trouve la table parmi tous, correspondant dans son parametre
        Pokemon.findByPk(req.params.id)
        .then(
            pokemon=> {
                const message= 'Un pokemon a bien été trouvé 🥊'
                res.json(
                    {message, data: pokemon}
                )
            }
        )
    })
}