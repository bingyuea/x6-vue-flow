import { Graph } from '@antv/x6'
class Keyboard {
  public static init(graph: Graph) {
    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      // @ts-ignore
      this.handleClick(graph, 'copy')
      return false
    })
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      // @ts-ignore
      this.handleClick(graph, 'paste')
      return false
    })
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      // @ts-ignore
      this.handleClick(graph, 'undo')
      return false
    })
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      // @ts-ignore
      this.handleClick(graph, 'redo')
      return false
    })
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      // @ts-ignore
      this.handleClick(graph, 'selectAll')
      return false
    })
    graph.bindKey('backspace', () => {
      // @ts-ignore
      this.handleClick(graph, 'clear')
      return false
    })
    graph.bindKey(['ctrl+up', 'meta+up'], () => {
      // @ts-ignore
      this.handleClick(graph, 'zoomIn')
      return false
    })
    graph.bindKey(['ctrl+down', 'meta+down'], () => {
      // @ts-ignore
      this.handleClick(graph, 'zoomOut')
      return false
    })
  }
}

export default Keyboard
