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
    })
 }