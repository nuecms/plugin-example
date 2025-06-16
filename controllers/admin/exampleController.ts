import { Op } from 'sequelize'
import models from '@models'
import useLog from '@core/logger'
import { Perm, Summary, CTags } from '@server/decorators'
import { Plugin } from '@server/decorators/plugin'
import { Res, Req, Controller, Post, Get, Put, Delete, Params, Query, Body } from '@server/decorators'

const log = useLog('example-plugin-admin')

@Controller('/example')
@CTags('Example Plugin Admin')
@Plugin('example') // Add the Plugin decorator with the plugin key
export class ExampleAdminController {
  @Get('/')
  @Perm('example:view')
  @Summary('获取示例数据列表')
  public async getList(@Query() query: any, @Res() res: any) {
    try {
      const { page = 1, pageSize = 10, status, keyword } = query

      const where: any = {}

      if (status !== undefined) {
        where.status = Number(status)
      }

      if (keyword) {
        where.title = { [Op.like]: `%${keyword}%` }
      }

      const { rows: data, count: total } = await models.example_data.findAndCountAll({
        where,
        include: [
          {
            model: models.staff,
            as: 'creator',
            attributes: ['id', 'username']
          }
        ],
        order: [['created_at', 'DESC']],
        limit: parseInt(pageSize),
        offset: (page - 1) * pageSize
      })

      return res.success({
        data: {
          list: data,
          total,
          page: Number(page),
          pageSize: Number(pageSize)
        }
      })
    } catch (err) {
      log.error('Get example data error:', err)
      return res.fail({
        msg: '获取数据失败',
        code: 500
      })
    }
  }

  @Post('/')
  @Perm('example:create')
  @Summary('创建示例数据')
  public async create(@Body() body: any, @Req() req: any, @Res() res: any) {
    try {
      const data = await models.example_data.create({
        ...body,
        created_by: req.supr.id
      })

      return res.success({
        data,
        msg: '创建成功'
      })
    } catch (err) {
      log.error('Create example data error:', err)
      return res.fail({
        msg: '创建数据失败',
        code: 500
      })
    }
  }

  @Put('/:id')
  @Perm('example:edit')
  @Summary('更新示例数据')
  public async update(@Params('id') id: string, @Body() body: any, @Res() res: any) {
    try {
      const data = await models.example_data.findByPk(id)

      if (!data) {
        return res.fail({
          msg: '数据不存在',
          code: 404
        })
      }

      await data.update(body)

      return res.success({
        msg: '更新成功'
      })
    } catch (err) {
      log.error('Update example data error:', err)
      return res.fail({
        msg: '更新数据失败',
        code: 500
      })
    }
  }

  @Delete('/:id')
  @Perm('example:delete')
  @Summary('删除示例数据')
  public async delete(@Params('id') id: string, @Res() res: any) {
    try {
      const data = await models.example_data.findByPk(id)

      if (!data) {
        return res.fail({
          msg: '数据不存在',
          code: 404
        })
      }

      await data.update({ status: 0 })

      return res.success({
        msg: '删除成功'
      })
    } catch (err) {
      log.error('Delete example data error:', err)
      return res.fail({
        msg: '删除数据失败',
        code: 500
      })
    }
  }
}
