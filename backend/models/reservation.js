module.exports = (Sequelize , DataTypes) => {
    const model = Sequelize.define('Reservation',{
        booking_id: {
            type: DataTypes.STRING(30),
            primaryKey: true
        },
        amount: {
            type: DataTypes.INTEGER(3),
            notNull: true
        },
        price_person: {
            type: DataTypes.DECIMAL(7,2),
            notNull: true
        },
        discount: {
            type: DataTypes.INTEGER(3),
            len: [0,100],
        },
        check_in_date: {
            type: DataTypes.DATE(6),
            notNull: true
        },
        check_out_date: {
            type: DataTypes.DATE(6),
            notNull: true
        },
        status: {
            type: DataTypes.STRING(20),
            notNull: true
        },
        pic_receipt_path: {
            type: DataTypes.TEXT,
            notNull: true
        },
        since_date: {
            type: DataTypes.DATE(6),
            notNull: true
        },
        update_date: {
            type: DataTypes.DATE(6),
            notNull: true
        },
        uid: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            notNull: false
        },
        package_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            notNull: false
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

        model.belongsTo(models.Member, {foreignKey: 'uid',allowNull: false}) //one to one || one to many
        model.belongsTo(models.PackageTour, {foreignKey: 'package_id',allowNull: false}) //one to one || one to many
        //model.belongsToMany(models.Member, {through: models.User}) //many to many
    } 
    return model;
}