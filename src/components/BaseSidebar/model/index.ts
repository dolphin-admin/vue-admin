import { i18n } from '@/i18n'
import type { MenuMixedOption } from '@/types'
import { renderIcon, renderRouterLink } from '@/utils'
import QRCodeIcon from '~icons/ic/baseline-qrcode'
import HomeIcon from '~icons/ic/sharp-house'
import UserInfoIcon from '~icons/mdi/account'
import PermissionIcon from '~icons/mdi/briefcase-arrow-left-right-outline'
import IconManagementIcon from '~icons/mdi/creative-commons'
import SystemFunctionIcon from '~icons/mdi/function-variant'
import DashboardIcon from '~icons/mdi/speedometer-medium'
import ComponentIcon from '~icons/mdi/vector-combine'

const { t } = i18n.global

export const menuOptions: MenuMixedOption[] = [
  {
    label: renderRouterLink('首页', '/'),
    key: 'home',
    icon: renderIcon(HomeIcon),
    isRouterLink: true
  },
  {
    label: t('Menu.SystemFunction'),
    labelKey: 'Menu.SystemFunction',
    key: 'system-function',
    icon: renderIcon(SystemFunctionIcon),
    menuType: 'label',
    children: [
      {
        label: renderRouterLink(t('Menu.QRCode'), '/qrcode'),
        labelKey: 'Menu.QRCode',
        path: '/qrcode',
        key: 'qrcode',
        icon: renderIcon(QRCodeIcon),
        menuType: 'routerLink'
      },
      {
        label: renderRouterLink(t('Menu.UserInfo'), '/user-info'),
        labelKey: 'Menu.UserInfo',
        path: '/user-info',
        key: 'user-info',
        icon: renderIcon(UserInfoIcon),
        menuType: 'routerLink'
      },
      {
        label: renderRouterLink(t('Menu.IconManagement'), '/icon-management'),
        labelKey: 'Menu.IconManagement',
        path: '/icon-management',
        key: 'icon-management',
        icon: renderIcon(IconManagementIcon),
        menuType: 'routerLink'
      }
    ]
  },
  {
    type: 'divider'
  },
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
    icon: renderIcon(SystemFunctionIcon),
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
  }
]
