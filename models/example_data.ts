import { Sequelize, DataTypes as SequelizeDataTypes } from 'sequelize'

export default function (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) {
  const table = sequelize.define(
    'example_data',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        comment: '数据ID'
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '标题'
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '内容'
      },
      plugin_config_id: {
        type: DataTypes.UUID,
        allowNull: true,
        comment: '相关配置ID'
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '状态:0-禁用,1-启用'
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: true,
        comment: '创建人ID'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '创建时间'
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '更新时间'
      }
    },
    {
      tableName: 'bs_example_data',
      timestamps: true,
      indexes: [
        {
          fields: [{ name: 'id' }],
          name: 'PRIMARY',
          unique: true
        },
        {
          fields: [{ name: 'status' }],
          name: 'idx_status'
        }
      ]
    }
  )

  table.associate = (models: any) => {
    table.belongsTo(models.staff, {
      as: 'creator',
      foreignKey: 'created_by'
    })
  }

  return table
}
