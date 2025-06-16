import { Op } from 'sequelize'
import models from '@models'
import useLog from '@core/logger'
import { Auth, Summary, CTags } from '@server/decorators'
import { Plugin } from '@server/decorators/plugin'
import { Res, Req, Controller, Post, Get, Params, Query, Body } from '@server/decorators'

const log = useLog('example-plugin')

@Controller('/example')
@CTags('Example Plugin')
@Plugin('example') // Add the Plugin decorator with the plugin key
export class ExampleController {
  @Get('/')
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

  @Get('/:id')
  @Summary('获取示例数据详情')
  public async getDetail(@Params('id') id: string, @Res() res: any) {
    try {
      const data = await models.example_data.findByPk(id)

      if (!data) {
        return res.fail({
          msg: '数据不存在',
          code: 404
        })
      }

      return res.success({
        data
      })
    } catch (err) {
      log.error('Get example data detail error:', err)
      return res.fail({
        msg: '获取数据详情失败',
        code: 500
      })
    }
  }

  @Post('/')
  @Summary('创建示例数据')
  @Auth('user')
  public async create(@Body() body: any, @Req() req: any, @Res() res: any) {
    try {
      const data = await models.example_data.create({
        ...body,
        created_by: req.user.id
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
}
