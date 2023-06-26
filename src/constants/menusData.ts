import { NIcon } from 'naive-ui'
import { h } from 'vue'
import { RouterLink } from 'vue-router'

import PermissionIcon from '~icons/mdi/briefcase-arrow-left-right-outline'
import FeatIcon from '~icons/mdi/function-variant'
import DashboardIcon from '~icons/mdi/speedometer-medium'
import CompIcon from '~icons/mdi/vector-combine'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export const menuOptionsData = [
  {
    label: '后台面板',
    key: 'dashboard',
    icon: renderIcon(DashboardIcon),
    children: [
      {
        label: '分析页',
        key: 'analysis'
      },
      {
        label: '工作台',
        key: 'workbench'
      }
    ]
  },
  {
    label: '权限管理',
    key: 'permission',
    icon: renderIcon(PermissionIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'login'
              }
            },
            { default: () => '页面权限' }
          ),
        key: 'permission-page'
      },
      {
        label: '菜单权限',
        key: 'permission-menu'
      },
      {
        label: '按钮权限',
        key: 'permission-btn'
      }
    ]
  },
  {
    label: '功能',
    key: 'feat',
    icon: renderIcon(FeatIcon),
    children: [
      {
        label: '图标',
        key: 'feat-icon'
      },
      {
        label: '打印',
        key: 'feat-print'
      },
      {
        label: '文件下载',
        key: 'feat-download'
      },
      {
        label: '图片剪裁',
        key: 'feat-img-clip'
      }
    ]
  },
  {
    label: '组件',
    key: 'comp',
    icon: renderIcon(CompIcon),
    children: [
      {
        label: '表单',
        key: 'comp-form',

        children: [
          {
            label: '表单模板',
            key: 'comp-form-templates'
          },
          {
            label: '打印',
            key: 'comp-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'comp-form-validation'
          }
        ]
      }
    ]
  }
]
