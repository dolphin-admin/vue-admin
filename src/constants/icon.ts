import type { IconItem } from '@/types'
import LineMdAccount from '~icons/line-md/account'
import LineMdAlignJustify from '~icons/line-md/align-justify'
import LineMdBell from '~icons/line-md/bell'
import LineMdCircle from '~icons/line-md/circle'
import LineMdCloudUploadOutlineLoop from '~icons/line-md/cloud-upload-outline-loop'
import LineMdDocumentList from '~icons/line-md/document-list'
import LineMdEdit from '~icons/line-md/edit'
import LineMdEmail from '~icons/line-md/email'
import LineMdHomeSimple from '~icons/line-md/home-simple'
import LineMdImage from '~icons/line-md/image'
import LineMdLoadingTwotoneLoop from '~icons/line-md/loading-twotone-loop'
import LineMdMenuToCloseAltTransition from '~icons/line-md/menu-to-close-alt-transition'
import LineMdMoonToSunny from '~icons/line-md/moon-filled-alt-to-sunny-filled-loop-transition'
import LineMdMoonFilledLoop from '~icons/line-md/moon-filled-loop'
import LineMdSearch from '~icons/line-md/search'
import LineMdStar from '~icons/line-md/star'

export const iconMap = new Map<string, IconItem>([
  ['LineMdAccount', { label: 'LineMdAccount', component: LineMdAccount }],
  ['LineMdAlignJustify', { label: 'LineMdAlignJustify', component: LineMdAlignJustify }],
  ['LineMdBell', { label: 'LineMdBell', component: LineMdBell }],
  ['LineMdCircle', { label: 'LineMdCircle', component: LineMdCircle }],
  ['LineMdMoonToSunny', { label: 'LineMdMoonToSunny', component: LineMdMoonToSunny }],
  ['LineMdMoonFilledLoop', { label: 'LineMdMoonFilledLoop', component: LineMdMoonFilledLoop }],
  ['LineMdStar', { label: 'LineMdStar', component: LineMdStar }],
  ['LineMdHomeSimple', { label: 'LineMdHomeSimple', component: LineMdHomeSimple }],
  ['LineMdCloudUploadOutlineLoop', { label: 'LineMdCloudUploadOutlineLoop', component: LineMdCloudUploadOutlineLoop }],
  ['LineMdImage', { label: 'LineMdImage', component: LineMdImage }],
  [
    'LineMdMenuToCloseAltTransition',
    { label: 'LineMdMenuToCloseAltTransition', component: LineMdMenuToCloseAltTransition }
  ],
  ['LineMdLoadingTwotoneLoop', { label: 'LineMdLoadingTwotoneLoop', component: LineMdLoadingTwotoneLoop }],
  ['LineMdEmail', { label: 'LineMdEmail', component: LineMdEmail }],
  ['LineMdSearch', { label: 'LineMdSearch', component: LineMdSearch }],
  ['LineMdEdit', { label: 'LineMdEdit', component: LineMdEdit }],
  ['LineMdDocumentList', { label: 'LineMdDocumentList', component: LineMdDocumentList }]
])

export const iconList = Array.from(iconMap.values())

export const iconSeriesMap = new Map([
  ['LineMd', { label: 'Material Line Icons', key: 'LineMd' }],
  ['material-symbols', { label: 'Material Symbols', key: 'material-symbols' }],
  ['ic', { label: 'Google Material Icons', key: 'ic' }],
  ['mdi', { label: 'Material Design Icons', key: 'mdi' }]
])

export const iconSeriesList = Array.from(iconSeriesMap.values())
