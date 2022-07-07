const validTypesPok = [ "Plante", "Poison", "Feu", "Eau", "Insecte", "Vol", "Electrik", "Fée", "Normal" ]

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
          // contraine d'unicité de sequelize, Ceci est son equivalence sans msg :         unique : true,
        unique: {
          msg: "Ce nom est déjà prise"
        },
        validate: {
          notEmpty: { msg: "Name ne peut être empty"  },  
          notNull: { msg: "Name ne peut être null" }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez que des nombres entiers pour le hp"},
          notNull: { msg: "Le hp est requise "},
          min:{
            args: [0],
            msg: "Le hp doit être superieur ou égale à 0"
          },
          max: {
            args: [999],
            msg: "Le hp ne doit pas surpasser 999"
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt: {msg: " Cp doit être un entier"},
          notNull: { msg: "Cp ne doit pas nuull"},
          min:{
            args: [0],
            msg: "Le cp doit être superieur ou égale à 0"
          },
          max: {
            args: [99],
            msg: "Le cp ne doit pas surpasser 99"
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl: { msg: "L'url n'est pas valide"},
          notNull: { msg: "L'url ne peut être null"}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')//le output sera en tableau
        },
        set(types){
          this.setDataValue('types', [...types].join()) //transformation en chaine de caractere
        },
          // ---- Validation métier personnalisé ------throw-----
        validate:{
          isValeurOk(value){
            if(!value){
                // si y a pas .catch() les instructions situées après l'instruction throw ne seront pas exécutées,  le programme sera terminé.
              throw new Error(" Le type d'un pokemon doit avoir au moins un.")
            }
            if ( value.split(',').length >3 ){
              throw new Error("Le type d'un pokémon doit avoir max trois.")
            }
              // chaque types entrée par l'user sera "comme égal à la fonction" type et vérifier si theType include dans valideTYpesPok
              // on le split car avec set elle le types est un chaîne de caractere
            value.split("," ).forEach(theType => {
              if(!validTypesPok.includes(theType))
              throw new Error( `Le type d'un pokémon doit être parmi ceux là: ${validTypesPok} `)
            });
          }
        }
        // -----------fin validate ---------------------------
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }