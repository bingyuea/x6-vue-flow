import { Addon } from '@antv/x6'

export default class Stencil {
  public static init() {
    this.stencil = new Addon.Stencil({
      target: this.graph,
      stencilGraphWidth: 280,
      search: { rect: true },
      collapsable: true,
      groups: [
        {
          name: 'basic',
          title: '基础节点',
          graphHeight: 180
        }
      ],
      validateNode: () => {
        return true
      }
    })
    const stencilContainer = document.querySelector('.x6-stencil')
    stencilContainer?.appendChild(this.stencil.container)
  }
}
