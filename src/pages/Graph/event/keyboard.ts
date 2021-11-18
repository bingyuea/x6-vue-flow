import { Graph } from '@antv/x6'
class Keyboard {
  public static init(graph: Graph) {
    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      this.handleClick(graph, 'copy')
      return false
    })
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      this.handleClick(graph, 'paste')
      return false
    })
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      this.handleClick(graph, 'undo')
      return false
    })
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      this.handleClick(graph, 'redo')
      return false
    })
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      this.handleClick(graph, 'selectAll')
      return false
    })
    graph.bindKey('backspace', () => {
      this.handleClick(graph, 'clear')
      return false
    })
    graph.bindKey(['ctrl+up', 'meta+up'], () => {
      this.handleClick(graph, 'zoomIn')
      return false
    })
    graph.bindKey(['ctrl+down', 'meta+down'], () => {
      this.handleClick(graph, 'zoomOut')
      return false
    })
  }
}

export default Keyboard
