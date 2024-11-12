module.exports = (Sequelize , DataTypes) => {
    const model = Sequelize.define('Package_tour',{
        package_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        package_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        days_trip: {
            type: DataTypes.INTEGER,
            len: [1,99],
        },
        max_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price_person: {
            type: DataTypes.DECIMAL(7,2),
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER,
            len: [0,100],
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        update_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: true
        }
    },{
        tableName: 'package_tour',
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        hooks: {
            afterCreate: async (package, options) => {
                // options.query('ALTER TABLE package_tour ADD CONSTRAINT `package_tour_ibfk_1` FOREIGN KEY(username) REFERENCES agent(username) ON DELETE NO ACTION ON UPDATE CASCADE check(expression)',
                //     {raw: false}
                // ).then().catch()
                console.log('package_tour check')
            },
        },
    });
    
    model.associate = models => {
        model.hasOne(models.Reservation,{foreignKey:'package_id'}) //one to many
        //model.belongsToMany(models.Reservation, {through: models.Reservation}) //many to many
        //model.hasMany(models.Gallery,{foreignKey:'package_id'}) //one to many

        //model.belongsTo(models.Agent,{foreignKey: 'username'}) //one to one || one to many
        //model.belongsTo(models.Reservation, {foreignKey: 'uid',allowNull: false}) //one to one || one to many
        //model.belongsToMany(models.Member, {through: models.User}) //many to many
    }
    return model;
}