module.exports = (Sequelize , DataTypes) => {
    const model = Sequelize.define('Payment',{
            id: {
                type: DataTypes.STRING(30),
                primaryKey: true
            },
            amount: {
                type: DataTypes.DECIMAL(7,2),
                notNull: true
            },
            currency:{
                type: DataTypes.STRING(15),
                notNull: true
            },
            status:{
                type: DataTypes.STRING(15),
                notNull: true
            },
            paid_at: {
                type: DataTypes.DATE(6),
                notNull: true
            },
            method: {
                type: DataTypes.STRING(20),
                notNull: true
            },
            booking_id: {
                type: DataTypes.STRING(30),
                foreignKey: true,
                notNull: true
            },
            uid: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                notNull: true
            },
         },{
        tableName: 'payment',
        collate: 'utf8mb4_general_ci',
        timestamps: false
    });
    
    model.associate = models => {
        //model.hasOne(models.Member,{foreignKey:'uid'}) //one to one
        //model.belongsToMany(models.Reservation, {through: models.Reservation}) //many to many
        //model.hasMany(models.Reservation,{foreignKey:'booking_id'}) //one to many

        model.belongsTo(models.Member, {foreignKey: 'uid',allowNull: false}) //one to one || one to many
        model.belongsTo(models.Reservation, {foreignKey: 'booking_id',allowNull: false}) //one to one || one to many
        //model.belongsToMany(models.Member, {through: models.User}) //many to many
    } 
    return model;
}