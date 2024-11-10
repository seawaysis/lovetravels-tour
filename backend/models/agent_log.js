module.exports = (Sequelize , DataTypes) => {
    const model = Sequelize.define('Agent_log',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        task: {
            type: DataTypes.TEXT,
            notNull: true
        },
        ip_address:{
            type: DataTypes.TEXT,
            notNull: true
        },
        username: {
            type: DataTypes.STRING(30),
            notNull: true
        }
    },{
        tableName: 'agent_log',
        collate: 'utf8mb4_general_ci',
        timestamps: true,
    });

     model.associate = models => {
        model.belongsTo(models.Agent, {foreignKey: 'username',allowNull: false})
     }
    return model;
}