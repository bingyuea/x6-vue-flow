import { Vue } from 'vue-property-decorator'
import { FunctionExt, Graph } from '@antv/x6'
import portsStyle from '../config/ports'
class Event extends Vue {
  public static initEvent(graph: Graph) {
    graph.on('node:contextmenu', ({ e, x, y, cell, view }) => {
      cell.attr('text/style/display', 'none')
      const elem = view.container.querySelector('.x6-edit-text') as HTMLElement
      if (elem) {
        elem.focus()
      }
    })
    graph.on(
      'node:mouseenter',
      FunctionExt.debounce(({ e, cell, view }) => {
        // 获取当前e的兄弟port
        const ports = document.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>
        this.showPorts(ports, true)
      }),
      500
    )
    graph.on('node:mouseleave', () => {
      // 获取当前e的兄弟port
      const ports = document.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>
      this.showPorts(ports, false)
    })

    graph.on('node:collapse', ({ node }: { node: any }) => {
      node.toggleCollapse()
      const collapsed = node.isCollapsed()
      const cells = node.getDescendants()
      cells.forEach((node: any) => {
        console.info('展示', node)
        if (collapsed && node.isNode()) {
          node.hide()
        } else {
          node.show()
        }
      })
    })
  }

  private static showPorts(ports: NodeListOf<SVGElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }
}

export default Event
