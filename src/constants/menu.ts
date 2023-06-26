import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

import PermissionIcon from '~icons/mdi/briefcase-arrow-left-right-outline'
import FeatureIcon from '~icons/mdi/function-variant'
import DashboardIcon from '~icons/mdi/speedometer-medium'
import ComponentIcon from '~icons/mdi/vector-combine'

const renderIcon = (icon: Component) => () => h(NIcon, null, { default: () => h(icon) })

const renderRouterLink = (label: string, to: string) => () => h(RouterLink, { to }, { default: () => label })

export const menuOptions = [
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
        key: 'workbench',
        children: [
          {
            label: '工作台',
            key: 'workbench2',
            children: [
              {
                label: '工作台',
                key: 'workbench3'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'group',
    label: '菜单分组',
    key: 'people',
    children: [
      {
        label: '图标',
        key: 'feature-icon'
      },
      {
        label: '打印',
        key: 'feature-print'
      },
      {
        label: '文件下载',
        key: 'feature-download'
      },
      {
        label: '图片剪裁',
        key: 'feature-img-clip'
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    label: '权限管理',
    key: 'permission',
    icon: renderIcon(PermissionIcon),
    children: [
      {
        label: renderRouterLink('页面权限', '/login'),
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
    key: 'feature',
    icon: renderIcon(FeatureIcon),
    children: [
      {
        label: '图标',
        key: 'feature-icon'
      },
      {
        label: '打印',
        key: 'feature-print'
      },
      {
        label: '文件下载',
        key: 'feature-download'
      },
      {
        label: '图片剪裁',
        key: 'feature-img-clip'
      }
    ]
  },
  {
    label: '组件',
    key: 'component',
    icon: renderIcon(ComponentIcon),
    children: [
      {
        label: '表单',
        key: 'component-form',
        children: [
          {
            label: '表单模板',
            key: 'component-form-templates'
          },
          {
            label: '打印',
            key: 'component-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'component-form-validation'
          }
        ]
      }
    ]
  },
  {
    label: '组件',
    key: 'component',
    icon: renderIcon(ComponentIcon),
    children: [
      {
        label: '表单',
        key: 'component-form',
        children: [
          {
            label: '表单模板',
            key: 'component-form-templates'
          },
          {
            label: '打印',
            key: 'component-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'component-form-validation'
          }
        ]
      }
    ]
  },
  {
    label: '组件',
    key: 'component',
    icon: renderIcon(ComponentIcon),
    children: [
      {
        label: '表单',
        key: 'component-form',
        children: [
          {
            label: '表单模板',
            key: 'component-form-templates'
          },
          {
            label: '打印',
            key: 'component-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'component-form-validation'
          }
        ]
      }
    ]
  },
  {
    label: '组件',
    key: 'component',
    icon: renderIcon(ComponentIcon),
    children: [
      {
        label: '表单',
        key: 'component-form',
        children: [
          {
            label: '表单模板',
            key: 'component-form-templates'
          },
          {
            label: '打印',
            key: 'component-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'component-form-validation'
          }
        ]
      }
    ]
  },
  {
    label: '组件',
    key: 'component',
    icon: renderIcon(ComponentIcon),
    children: [
      {
        label: '表单',
        key: 'component-form',
        children: [
          {
            label: '表单模板',
            key: 'component-form-templates'
          },
          {
            label: '打印',
            key: 'component-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'component-form-validation'
          }
        ]
      }
    ]
  },
  {
    label: '组件',
    key: 'component',
    icon: renderIcon(ComponentIcon),
    children: [
      {
        label: '表单',
        key: 'component-form',
        children: [
          {
            label: '表单模板',
            key: 'component-form-templates'
          },
          {
            label: '打印',
            key: 'component-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'component-form-validation'
          }
        ]
      }
    ]
  },
  {
    label: '组件',
    key: 'component',
    icon: renderIcon(ComponentIcon),
    children: [
      {
        label: '表单',
        key: 'component-form',
        children: [
          {
            label: '表单模板',
            key: 'component-form-templates'
          },
          {
            label: '打印',
            key: 'component-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'component-form-validation'
          }
        ]
      }
    ]
  },
  {
    label: '组件',
    key: 'component',
    icon: renderIcon(ComponentIcon),
    children: [
      {
        label: '表单',
        key: 'component-form',
        children: [
          {
            label: '表单模板',
            key: 'component-form-templates'
          },
          {
            label: '打印',
            key: 'component-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'component-form-validation'
          }
        ]
      }
    ]
  },
  {
    label: '组件',
    key: 'component',
    icon: renderIcon(ComponentIcon),
    children: [
      {
        label: '表单',
        key: 'component-form',
        children: [
          {
            label: '表单模板',
            key: 'component-form-templates'
          },
          {
            label: '打印',
            key: 'component-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'component-form-validation'
          }
        ]
      }
    ]
  },
  {
    label: '组件',
    key: 'component',
    icon: renderIcon(ComponentIcon),
    children: [
      {
        label: '表单',
        key: 'component-form',
        children: [
          {
            label: '表单模板',
            key: 'component-form-templates'
          },
          {
            label: '打印',
            key: 'component-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'component-form-validation'
          }
        ]
      }
    ]
  },
  {
    label: '组件',
    key: 'component',
    icon: renderIcon(ComponentIcon),
    children: [
      {
        label: '表单',
        key: 'component-form',
        children: [
          {
            label: '表单模板',
            key: 'component-form-templates'
          },
          {
            label: '打印',
            key: 'component-form-step-by-step'
          },
          {
            label: '表单验证',
            key: 'component-form-validation'
          }
        ]
      }
    ]
  }
]
