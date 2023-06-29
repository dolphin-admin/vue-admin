import type { FormItemRule, FormRules } from 'naive-ui'

// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

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

export const loginRules: FormRules = {
  username: [
    {
      required: true,
      message: t('Common.Validation.Username'),
      trigger: ['blur', 'input']
    }
  ],
  password: [
    {
      required: true,
      message: t('Common.Validation.Password'),
      trigger: ['blur', 'input']
    },
    {
      validator: (rule: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: t('Common.Validation.PasswordLength')
    }
  ]
}

export const signupRules: FormRules = {
  username: [
    {
      required: true,
      message: t('Common.Validation.Username'),
      trigger: ['blur', 'input']
    }
  ],
  password: [
    {
      required: true,
      message: t('Common.Validation.Password'),
      trigger: ['blur', 'input']
    },
    {
      validator: (rule: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: t('Common.Validation.PasswordLength')
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: t('Common.Validation.ConfirmPassword'),
      trigger: ['blur', 'input']
    },
    {
      validator: (rule: FormItemRule, value: string) => value === formData.password,
      message: t('Common.Validation.ConfirmPasswordNotMatch')
    }
  ]
}
