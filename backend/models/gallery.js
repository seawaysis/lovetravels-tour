module.exports = (Sequelize , DataTypes) => {
    const model = Sequelize.define('Gallery',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        pic_part: {
            type: DataTypes.TEXT,
            notNull: true
        },
        type: {
            type: DataTypes.STRING(10),
            notNull: true
        },
        update_date: {
            type: DataTypes.DATE(6),
            notNull: true
        },
        package_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
    },{
        tableName: 'gallery',
        collate: 'utf8mb4_general_ci',
        timestamps: false,
    });
    
    model.associate = models => {
        //model.hasOne(models.Reservation,{foreignKey:'uid'}) //one to one
        //model.belongsToMany(models.Reservation, {through: models.Reservation}) //many to many
        //model.hasMany(models.Reservation,{foreignKey:'booking_id'}) //one to many

        model.belongsTo(models.Package_tour, {foreignKey: 'package_id',allowNull: false}) //one to one || one to many
        //model.belongsTo(models.Reservation, {foreignKey: 'uid',allowNull: false}) //one to one || one to many
        //model.belongsToMany(models.Member, {through: models.User}) //many to many
    }
    return model;
}