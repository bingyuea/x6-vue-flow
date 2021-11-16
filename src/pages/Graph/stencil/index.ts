import { Addon } from '@antv/x6'

export default class Stencil {
  public static init(graph) {
    const stencil = new Addon.Stencil({
      target: graph,
      stencilGraphWidth: 280,
      stencilGraphHeight: 600,
      search: { rect: false },
      center: true,
      groups: [
        {
          name: 'basic',
          title: '基础节点',
          collapsable: true,
          graphHeight: 1600
        }
      ],
      layoutOptions: {
        columns: 1,
        resizeToFit: true,
        center: true
      },
      validateNode: () => {
        return true
      }
    })
    const stencilContainer = document.querySelector('.x6-stencil')
    stencilContainer?.appendChild(stencil.container)
    return stencil
  }
}
