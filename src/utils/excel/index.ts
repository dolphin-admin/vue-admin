import * as XLSX from 'xlsx'

import type { HeaderItem } from '@/types'

export class ExcelUtils {
  /**
   * 导出excel
   * @param header 导出数据的头部
   * @param data 导出的数据
   * @param filename 导出文件的名字
   */
  static export(header: HeaderItem[], data: any, filename: string) {
    if (data.length === 0) {
      return
    }

    const dataArray = []
    const itemWidth: { width: number }[] = []
    const itemHeader: string[] = []

    header.forEach((headerItem) => {
      if (!headerItem.ignore) {
        itemHeader.push(headerItem.key)
        itemWidth.push({ width: headerItem.width })
      }
    })

    dataArray.push(itemHeader)

    data.forEach((item: any) => {
      const newItem = itemHeader.map((i) => item[i])
      dataArray.push(newItem)
    })

    const exportFileName = `${filename}.xlsx`
    // 单页脚本
    const wsName = 'SheetJS'
    // 初始化文件
    const wb = XLSX.utils.book_new()
    // 初始化一个excel文档，此时需要传入数据
    const ws = XLSX.utils.aoa_to_sheet(dataArray)

    ws['!cols'] = itemWidth

    // 文档插入文件定义名称
    XLSX.utils.book_append_sheet(wb, ws, wsName)
    // 下载
    XLSX.writeFile(wb, exportFileName)
  }
}
