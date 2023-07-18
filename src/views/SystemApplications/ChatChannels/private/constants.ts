import type { MenuOption } from 'naive-ui'

import IcBaselineAlignVerticalCenterIcon from '~icons/ic/baseline-align-vertical-center'
import MessageIcon from '~icons/ic/outline-message'

const { renderIcon: renderMenuIcon, renderMenuLabel } = RenderUtils

export const chatroomMenuOptions: MenuOption[] = [
  {
    label: renderMenuLabel('TEXT CHANNELS'),
    key: 'TEXT CHANNELS',
    icon: renderMenuIcon(IcBaselineAlignVerticalCenterIcon),
    children: [
      {
        label: renderMenuLabel('general'),
        key: 'general',
        icon: renderMenuIcon(IcBaselineAlignVerticalCenterIcon)
      },
      {
        label: renderMenuLabel('issues'),
        key: 'issues',
        icon: renderMenuIcon(MessageIcon)
      },
      {
        label: renderMenuLabel('changelog'),
        key: 'changelog',
        icon: renderMenuIcon(IcBaselineAlignVerticalCenterIcon)
      }
    ]
  }
]
