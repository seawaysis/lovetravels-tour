module.exports = (Sequelize , DataTypes) => {
    const model = Sequelize.define('PackageTour',{
        package_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        package_name: {
            type: DataTypes.STRING,
            notNull: false
        },
        description: {
            type: DataTypes.TEXT,
            notNull: false
        },
        days_trip: {
            type: DataTypes.INTEGER(2),
            len: [1,99],
        },
        max_amount: {
            type: DataTypes.INTEGER(4),
            notNull: false
        },
        company_name: {
            type: DataTypes.STRING,
            notNull: false
        },
        price_person: {
            type: DataTypes.DECIMAL(7,2),
            notNull: false
        },
        discount: {
            type: DataTypes.INTEGER(3),
            len: [0,100],
            notNull: true
        },
        start_date: {
            type: DataTypes.DATE,
            notNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            notNull: false
        },
        status: {
            type: DataTypes.STRING(10),
            notNull: false
        },
        update_date: {
            type: DataTypes.DATE,
            notNull: false
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    },{
        tableName: 'packageTour',
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        hooks: {
            afterCreate: async (package, options) => {
                // options.query('ALTER TABLE packageTour ADD CONSTRAINT `packageTour_ibfk_1` FOREIGN KEY(username) REFERENCES agent(username) ON DELETE NO ACTION ON UPDATE CASCADE check(expression)',
                //     {raw: false}
                // ).then().catch()
                console.log('packageTour check')
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