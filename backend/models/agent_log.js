module.exports = (Sequelize , DataTypes) => {
    const model = Sequelize.define('Agent_log',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        task: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        ip_address:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
        }
    },{
        tableName: 'agent_log',
        collate: 'utf8mb4_general_ci',
        timestamps: true,
    });
    model.associate = models => {
        //model.belongsTo(models.Agent, {foreignKey:'username', targetKey: 'username', foreignKeyConstraint: true})
     }
    return model;
}