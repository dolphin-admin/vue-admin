import type { Dictionary } from '@/types'

export const Dictionaries: Dictionary[] = [
  {
    id: 1,
    name: '用户性别',
    type: 'sys_user_sex',
    status: 1,
    remark: '用户性别列表',
    createAt: '2023-04-23 16:13:13'
  },
  {
    id: 2,
    name: '菜单状态',
    type: 'sys_show_hide',
    status: 1,
    remark: '菜单状态列表',
    createAt: '2023-04-23 16:13:14'
  },
  {
    id: 3,
    name: '系统开关',
    type: 'sys_normal_disable',
    status: 0,
    remark: '系统开关列表',
    createAt: '2023-04-23 16:13:14'
  },
  {
    id: 4,
    name: '任务状态',
    type: 'sys_job_status',
    status: 0,
    remark: '用户性别列表',
    createAt: '2023-04-23 16:13:13'
  },
  {
    id: 5,
    name: '任务分组',
    type: 'sys_job_group',
    status: 0,
    remark: '任务分组列表',
    createAt: '2023-04-23 16:13:15'
  },
  {
    id: 6,
    name: '系统是否',
    type: 'sys_yes_no',
    status: 0,
    remark: '系统是否列表',
    createAt: '2023-04-23 16:13:15'
  },
  {
    id: 7,
    name: '通知类型',
    type: 'sys_notice_type',
    status: 1,
    remark: '通知类型列表',
    createAt: '2023-04-23 16:13:15'
  },
  {
    id: 8,
    name: '操作类型',
    type: 'sys_operate_type',
    status: 1,
    remark: '操作类型列表',
    createAt: '2023-04-23 16:13:15'
  }
]
