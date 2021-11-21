import { Addon, Graph } from '@antv/x6'

export default class Stencil {
  public static init(graph: Graph) {
    const stencil = new Addon.Stencil({
      title: 'x6-flow-vue',
      target: graph,
      stencilGraphWidth: 280,
      stencilGraphHeight: 600,
      placeholder: '请输入物料名',
      notFoundText: '暂无数据',
      groups: [
        {
          name: 'basic',
          title: '基础节点',
          collapsable: true,
          graphHeight: 400
        },
        {
          name: 'image',
          title: '图片节点',
          collapsable: true,
          graphHeight: 400
        }
      ],
      layoutOptions: {
        columns: 1,
        resizeToFit: true,
        center: true
      },
      search: (cell, keyword, groupName, stencil) => {
        if (keyword) {
          return cell.shape.includes(keyword)
        }
        return true
      }
    })
    const stencilContainer = document.querySelector('.x6-stencil')
    stencilContainer?.appendChild(stencil.container)
    return stencil
  }
}
