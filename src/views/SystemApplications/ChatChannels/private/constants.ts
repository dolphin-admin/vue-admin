import type { MenuOption } from 'naive-ui'

import IcBaselineAlignVerticalCenterIcon from '~icons/ic/baseline-align-vertical-center'
import MessageIcon from '~icons/ic/outline-message'

const { renderIcon, renderMenuLabel } = RenderUtils

export const chatroomMenuOptions: MenuOption[] = [
  {
    label: renderMenuLabel(() => 'TEXT CHANNELS'),
    key: 'TEXT CHANNELS',
    icon: renderIcon(IcBaselineAlignVerticalCenterIcon),
    children: [
      {
        label: renderMenuLabel(() => 'general'),
        key: 'general',
        icon: renderIcon(IcBaselineAlignVerticalCenterIcon)
      },
      {
        label: renderMenuLabel(() => 'issues'),
        key: 'issues',
        icon: renderIcon(MessageIcon)
      },
      {
        label: renderMenuLabel(() => 'changelog'),
        key: 'changelog',
        icon: renderIcon(IcBaselineAlignVerticalCenterIcon)
      }
    ]
  }
]
