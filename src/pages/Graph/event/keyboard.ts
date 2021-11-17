import { Graph } from '@antv/x6'
class Keyboard {
  public static init(graph: Graph) {
    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      this.handleClick(graph, 'copy')
    })
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      this.handleClick(graph, 'paste')
    })
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      this.handleClick(graph, 'undo')
    })
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      this.handleClick(graph, 'redo')
    })
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      this.handleClick(graph, 'selectAll')
    })
    graph.bindKey('backspace', () => {
      this.handleClick(graph, 'clear')
    })
    // todo fix 和默认事件冲突
    graph.bindKey(['ctrl++', 'meta++'], () => {
      this.handleClick(graph, 'zoomIn')
    })
    graph.bindKey(['ctrl+-', 'meta+-'], () => {
      this.handleClick(graph, 'zoomOut')
    })
  }
}

export default Keyboard
