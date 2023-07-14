const { t } = i18n.global

export const languageOptions = [
  { label: 'English', key: 'en_US' },
  { label: '简体中文', key: 'zh_CN' }
]

export const userOptions = [
  {
    label: () => t('Menu.UserInfo'),
    key: 'UserInfo'
  },
  {
    label: () => t('Header.ChangePassword'),
    key: 'ChangePassword'
  },
  // {
  //   label: () => t('Header.LockScreen'),
  //   key: 'Lock'
  // },
  {
    label: () => t('Header.Logout'),
    key: 'Quit'
  }
]
