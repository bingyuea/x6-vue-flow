import { Graph } from '@antv/x6'
import ports from '@/pages/Graph/config/ports'
const port = {
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
export default function() {
  Graph.registerNode('X6Image', {
    inherit: 'image',
    attrs: {
      image: { 'xlink:href': '' }
    },
    ports: port
  })

  Graph.registerNode('custom-rect', {
    inherit: 'rect',
    width: 30,
    height: 15,
    attrs: {
      body: {
        strokeWidth: 1
      }
    },
    ports: port
  })

  Graph.registerNode('custom-polygon', {
    inherit: 'polygon',
    width: 30,
    height: 15,
    attrs: {
      body: {
        strokeWidth: 1
      }
    },
    ports: port
  })

  Graph.registerNode('custom-circle', {
    inherit: 'circle',
    width: 24,
    height: 24,
    attrs: {
      body: {
        strokeWidth: 1
      }
    },
    ports: port
  })
}
