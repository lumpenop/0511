const Sequelize = require('sequelize'); // class 
const moment = require('moment');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id:{
                type:Sequelize.STRING(20),
                allowNull:false, // NOT NULL 
                unique:true, // UNIQUE 
            },
            user_pw:{
                type:Sequelize.STRING(40),
                allowNull:false,
            },
            user_name:{
                type:Sequelize.STRING(10),
                allowNull:false,
            },
            gender:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
            },
            user_image:{
                type:Sequelize.STRING(100),
                allowNull:true,
            },
            user_dt:{
                type:Sequelize.DATEONLY,
                allowNull:false,
                defaultValue:Sequelize.NOW,
                get: function() {
                    return moment(this.getDataValue('user_dt')).format('DD.MM.YYYY')
                 }
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'User',
            tableName:'users',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }
}

/*
    userid
    userpw
    username
    gender
    userimage
    userdt
*/