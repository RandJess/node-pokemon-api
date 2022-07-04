const { Pokemon } = require("../db/sequelize")

module.exports= (app)=>{
    app.post('/api/pokemons', (req,res) => {
        Pokemon.create(req.body)
        .then( 
            pokemon=>{
                const message = `Le ${re.body.name} est ajoutée avec success`
                res.json(
                    { message, data: pokemon }
                )
            }
        )
    })
}