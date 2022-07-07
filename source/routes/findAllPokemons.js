 const { Pokemon } = require('../db/sequelize')

 module.exports = (app)=>{
    app.get('/api/pokemons', (req, res)=>{
        Pokemon.findAll()
        .then(
            pokemons=>{
                const message = 'Recup liste pokemons réussi'
                res.json(
                    {message, data: pokemons}
                )
            }
        )
        .catch(error=>{
            const messageErreur = "La recupératoin de la liste des pokemons a échouée 😓"
            res.status(500).json( {messageErreur, data : error})
        }) 
    })
 }