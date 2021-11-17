import { Graph, Addon, Edge, FunctionExt, Shape } from '@antv/x6'
import { X6Image } from './shape/registerNode'
import { X6Line } from './edge/registerEdge'
console.log(X6Image)
console.log(X6Line)
import graphData from './data'
import fireWallIcon from '../icons/fireWall.png'
import networkCloudIcon from '../icons/network_cloud.png'
import pcIcon from '../icons/pc.png'
import routerIcon from '../icons/router.png'
import serverIcon from '../icons/server.png'
import switchIcon from '../icons/switch.png'
import Stencil from './stencil/index'
import Event from './event/index'

export default class graph {
  public static graph: Graph
  public static line: Edge
  private static stencil: Addon.Stencil
  public static init() {
    this.graph = new Graph({
      container: document.querySelector('.x6-graph') as HTMLElement,
      width: 0,
      height: 0,
      autoResize: true,
      background: false,
      grid: {
        size: 10,
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#E7E8EA',
            thickness: 1
          },
          {
            color: '#CBCED3',
            thickness: 1,
            factor: 5
          }
        ]
      },
      panning: {
        enabled: true,
        modifiers: 'ctrl'
      },
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3
      },
      connecting: {
        snap: true,
        // 是否允许连接到画布空白位置的点
        allowBlank: false,
        // 是否允许在相同的起始节点和终止之间创建多条边
        allowMulti: false,
        // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点，
        allowLoop: false,
        highlight: true,
        anchor: 'center',
        connectionPoint: 'anchor',
        dangling: false,
        router: 'manhattan',
        createEdge: () => {
          this.line = new X6Line()
          return this.line
        },
        validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
          if (sourceView === targetView) {
            return false
          }
          return true
        }
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: 'rgba(223,234,255)'
            }
          }
        },
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#D06269',
              stroke: '#D06269'
            }
          }
        }
      },
      resizing: true,
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
        filter: node => {
          const data = node.getData() as any
          return !(data && data.parent)
        }
      },
      snapline: true,
      keyboard: true,
      history: true,
      clipboard: true
    })
    this.stencil = Stencil.init(this.graph)
    this.initShape()
    // this.initGraphShape()
    Event.initEvent(this.graph)
    return this.graph
  }

  private static initShape() {
    const { graph } = this

    const nodes: Node[] = []
    ;[
      {
        name: '服务器',
        img: serverIcon
      },

      {
        name: '终端用户',
        img: pcIcon
      },
      {
        name: '交换机',
        img: switchIcon
      },
      {
        name: '路由器',
        img: routerIcon
      },
      {
        name: '防火墙',
        img: fireWallIcon
      },
      {
        name: '广域网',
        img: networkCloudIcon
      }
    ].forEach(el => {
      nodes.push(
        graph.createNode({
          shape: 'X6Image',
          attrs: {
            image: {
              'xlink:href': el.img
            }
          }
        })
      )
    })

    this.stencil.load(nodes, 'basic')
  }

  private static initGraphShape() {
    this.graph.fromJSON(graphData as any)
  }

  private static showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }
}
