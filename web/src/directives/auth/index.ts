import type { DirectiveBinding } from 'vue'

export const auth = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    if (!PermissionUtils.hasPermission(value) && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  }
}
