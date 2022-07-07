const { Pokemon } = require("../db/sequelize")
//Importe l' ORM Sequelize
const { ValidationError, UniqueConstraintError } =  require("sequelize")

module.exports= (app)=>{
    app.post('/api/pokemons', (req,res) => {
        Pokemon.create(req.body)
        .then( 
            pokemon=>{
                const message = `Le ${req.body.name} est ajoutée avec success`
                res.json(
                    { message, data: pokemon }
                )
            }
        )
        .catch(error=>{
            if( error instanceof ValidationError){
                return res.status(400).json( {messageErreur : error.message , data : error})
            }
            if( error instanceof UniqueConstraintError){
                return res.status(400).json( {messageErreur : error.message , data : error})
            }
            const messageErreur = "L'ajout d'un pokémon dans la liste a échouée 😓"
            res.status(500).json( {messageErreur, data : error})
        }) 
    })
}