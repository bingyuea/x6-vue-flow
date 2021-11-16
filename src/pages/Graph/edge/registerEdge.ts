import { Graph } from '@antv/x6'
export const X6Line = Graph.registerEdge('X6Line', {
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
