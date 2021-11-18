import { Graph } from '@antv/x6'

export default function() {
  Graph.registerEdge('X6Line', {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#5F95FF',
        strokeWidth: 1
      }
    },
    router: {
      name: 'manhattan'
    }
  })
}
