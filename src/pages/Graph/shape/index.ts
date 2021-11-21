import serverIcon from "@/pages/icons/server.png"
import pcIcon from '@/pages/icons/pc.png'
import switchIcon from '@/pages/icons/switch.png'
import routerIcon from '@/pages/icons/router.png'
import fireWallIcon from '@/pages/icons/fireWall.png'
import networkCloudIcon from '@/pages/icons/network_cloud.png'

export default class testShape {
  public static init(graph: any, stencil: any) {
    const basicNodes: Node[] = []
    const imageNodes: Node[] = []
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
      imageNodes.push(
        graph.createNode({
          shape: 'X6Image',
          name,
          attrs: {
            image: {
              'xlink:href': el.img
            }
          }
        })
      )
    })
    const r1 = graph.createNode({
      shape: 'custom-rect',
      name: 'custom-rect'
    })
    const r2 = graph.createNode({
      shape: 'custom-rect',
      name: 'custom-rect-radius',
      attrs: {
        body: {
          rx: 4,
          ry: 4
        }
      }
    })
    const r3 = graph.createNode({
      shape: 'custom-polygon',
      name: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20'
        }
      }
    })
    const r4 = graph.createNode({
      shape: 'custom-polygon',
      name: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '10,0 40,0 30,20 0,20'
        }
      }
    })
    const r5 = graph.createNode({
      shape: 'custom-circle',
      name: 'custom-circle'
    })
    basicNodes.push(r1, r2, r3, r4, r5)
    stencil.load(basicNodes, 'basic')
    stencil.load(imageNodes, 'image')
  }
}
