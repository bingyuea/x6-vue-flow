import serverIcon from '@/pages/icons/server.png'
import pcIcon from '@/pages/icons/pc.png'
import switchIcon from '@/pages/icons/switch.png'
import routerIcon from '@/pages/icons/router.png'
import fireWallIcon from '@/pages/icons/fireWall.png'
import networkCloudIcon from '@/pages/icons/network_cloud.png'

export default class testShape {
  public static init(graph, stencil) {
    /*    const nodes: Node[] = [];
        [
            {
                name: '服务器',
                img: serverIcon,
            },

            {
                name: '终端用户',
                img: pcIcon,
            },
            {
                name: '交换机',
                img: switchIcon,
            },
            {
                name: '路由器',
                img: routerIcon,
            },
            {
                name: '防火墙',
                img: fireWallIcon,
            },
            {
                name: '广域网',
                img: networkCloudIcon,
            },
        ].forEach((el) => {
            nodes.push(
                graph.createNode({
                    shape: 'flow-chart-image-rect',
                    attrs: {
                        image: {
                            'xlink:href': el.img,
                        },
                        text: {
                            textWrap: {
                                text: el.name,
                            },
                        },
                    },
                }),
            );
        });
        stencil.load(nodes, 'basic');*/
    return this
  }
}
