import { Graph } from '@antv/x6'
import ports from '@/pages/Graph/config/ports'

export default function() {
  Graph.registerNode('X6Image', {
    inherit: 'image',
    attrs: {
      image: { 'xlink:href': '' }
    },
    ports: {
      groups: {
        top: {
          ...ports.style.default,
          position: 'top'
        },
        bottom: {
          ...ports.style.default,
          position: 'bottom'
        },
        left: {
          ...ports.style.default,
          position: 'left'
        },
        right: {
          ...ports.style.default,
          position: 'right'
        }
      },
      items: [
        { id: 'top', group: 'top' },
        { id: 'left', group: 'left' },
        { id: 'right', group: 'right' },
        { id: 'bottom', group: 'bottom' }
      ]
    }
  })
}
