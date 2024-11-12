module.exports = (Sequelize , DataTypes) => {
    const model = Sequelize.define('Reservation',{
        booking_id: {
            type: DataTypes.STRING(20),
            primaryKey: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price_person: {
            type: DataTypes.DECIMAL(7,2),
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER,
            len: [0,100],
        },
        check_in_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        check_out_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        since_date: {
            type: DataTypes.DATE(6),
            allowNull: false,
        },
        update_date: {
            type: DataTypes.DATE(6),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uid: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        package_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
    },{
        tableName: 'reservation',
        collate: 'utf8mb4_general_ci',
        timestamps: false
    });
    
    model.associate = models => {
        //model.hasOne(models.Member,{foreignKey:'uid'}) //one to one
        //model.belongsToMany(models.Reservation, {through: models.Reservation}) //many to many
        //model.hasMany(models.Reservation,{foreignKey:'booking_id'}) //one to many
        model.hasMany(models.Payment,{foreignKey:'booking_id'})

        model.belongsTo(models.Member, {foreignKey: 'uid',allowNull: false}) //one to one || one to many
        model.belongsTo(models.Package_tour, {foreignKey: 'package_id',allowNull: false}) //one to one || one to many
        //model.belongsToMany(models.Member, {through: models.User}) //many to many
    } 
    return model;
}