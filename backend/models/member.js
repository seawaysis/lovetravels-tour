module.exports = (Sequelize , DataTypes) => {
    const model = Sequelize.define('Member',{
        uid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            notNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            notNull: false
        },
        conf_email: {
            type: DataTypes.TEXT,
            notNull: false
        },
        update_date: {
            type: DataTypes.DATE,
            notNull: false
        }
    },{
        tableName: 'member',
        collate: 'utf8mb4_general_ci',
        timestamps: false,
    });
    
    model.associate = models => {
        //model.hasOne(models.Reservation,{foreignKey:'uid'}) //one to one
        //model.belongsToMany(models.Reservation, {through: models.Reservation}) //many to many
        model.hasMany(models.Reservation,{foreignKey:'uid'}) //one to many
        model.hasMany(models.Payment,{foreignKey:'uid'})

        //model.belongsTo(models.Reservation, {foreignKey: 'uid',allowNull: false}) //one to one || one to many
        //model.belongsToMany(models.Member, {through: models.User}) //many to many
    }
    return model;
}