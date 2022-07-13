
module.exports= (sequelize, DataTypes)=>{
    return sequelize.define( 'User', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            unique:{
                msg: "Ce username est déjà prise"
            }
        },
        psw:{
            type: DataTypes.STRING
        }
    })
}