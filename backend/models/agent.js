module.exports = (Sequelize , DataTypes) => {
    const model = Sequelize.define('Agent',{
        license_id: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            unique: true
        },
        username: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            notNull: false
        },
        email: {
            type: DataTypes.STRING,
            notNull: false,
        },
        conf_email: {
            type: DataTypes.TEXT,
            notNull: false
        },
        company_name: {
            type: DataTypes.STRING,
            notNull: false
        },
        tel: {
            type: DataTypes.STRING(20),
            notNull: false
        },
        pic_payment_path: {
            type: DataTypes.TEXT,
            notNull: false
        },
        update_date: {
            type: DataTypes.DATE,
            notNull: false
        }
    },{
        tableName: 'agent',
        collate: 'utf8mb4_general_ci',
        timestamps: false,
    });
    
    model.associate = models => {
    //     //model.hasOne(models.Reservation,{foreignKey:'uid'}) //one to one
    //     //model.belongsToMany(models.Reservation, {through: models.Reservation}) //many to many
        //model.hasMany(models.Package_tour,{foreignKey:{ name: 'username', field: 'username' }}) //one to many

    //     //model.belongsTo(models.Package_tour, {foreignKey: 'license_id',allowNull: false}) //one to one || one to many
    //     //model.belongsTo(models.Reservation, {foreignKey: 'uid',allowNull: false}) //one to one || one to many
    //     //model.belongsToMany(models.Member, {through: models.User}) //many to many
    }
    return model;
}