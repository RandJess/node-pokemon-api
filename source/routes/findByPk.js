const { Pokemon }= require('../db/sequelize')

module.exports= (app)=>{
    app.get('/api/pokemons/:id', (req, res)=>{
        //+ findByPk ne fait aucune difference entre "1" et 1
        //+ 🥊PAS besoin de parserInt le req.params.id
        Pokemon.findByPk(req.params.id)
        .then(
            pokemon=> {
                const message= 'Un pokemon a bien été trouvé'
                res.json(
                    {message, data: pokemons}
                )
            }
        )
    })
}