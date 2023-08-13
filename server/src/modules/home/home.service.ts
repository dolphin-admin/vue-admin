import { Injectable } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'

@Injectable()
export class HomeService {
  constructor(private readonly i18n: I18nService) {}

  getHello() {
    const { lang } = I18nContext.current()!
    return this.i18n.t('home.Welcome', { lang })
  }

  getVersion() {
    return '0.0.1'
  }
}
