import type { FormRules } from 'naive-ui'

export const userInfoRules: FormRules = {
  name: [
    {
      required: true,
      message: '请输入用户名字',
      trigger: ['blur', 'input']
    }
  ],
  firstName: [
    {
      required: true,
      message: '请输入名字',
      trigger: ['blur', 'input']
    }
  ],
  lastName: [
    {
      required: true,
      message: '请输入姓',
      trigger: ['blur', 'input']
    }
  ],
  email: [
    {
      key: 'edit',
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入邮箱'
    },
    {
      pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      message: '请输入正确格式的邮箱',
      trigger: ['input', 'blur']
    }
  ],
  phoneNumber: [
    {
      pattern: /^[1][3456789]\d{9}$/,
      message: '请输入正确格式的手机号',
      trigger: ['input', 'blur']
    }
  ]
}
