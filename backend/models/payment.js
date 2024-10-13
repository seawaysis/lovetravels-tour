module.exports = (Sequelize , DataTypes) => {
    const model = Sequelize.define('Payment',{
            id_paid: {
                type: DataTypes.STRING(30),
                primaryKey: true
            },
            amount: {
                type: DataTypes.DECIMAL(7,2),
                notNull: false
            },
            currency:{
                type: DataTypes.STRING(15),
                notNull: false
            },
            status:{
                type: DataTypes.STRING(15),
                notNull: false
            },
            paid_at: {
                type: DataTypes.DATE(6),
                notNull: false
            },
            method: {
                type: DataTypes.STRING(20),
                notNull: false
            },
            pic_receipt_path: {
                type: DataTypes.TEXT,
                notNull: true
            },
            booking_id: {
                type: DataTypes.STRING(30),
                foreignKey: true,
                notNull: false
            },
            uid: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                notNull: false
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