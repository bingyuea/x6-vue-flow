import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { Graph } from '@antv/x6'
import screenfull from 'screenfull'

@Component
export class ToolbarFunctions extends Vue {
  async handleClick(graph: Graph, commandName: string) {
    const zoom = graph.zoom()
    const cells = graph.getSelectedCells()

    switch (commandName) {
      case 'undo':
        graph.history.undo()
        break
      case 'redo':
        graph.history.redo()
        break
      case 'copy':
        if (!cells.length) {
          this.$message.error('请选择要复制的节点/边！')
          return
        }
        // @ts-ignore
        graph.copy(graph.getSelectedCells(), true, true)
        this.$message.success('已复制')
        break
      case 'paste':
        // @ts-ignore
        graph.paste(true)
        this.$message.success('已粘贴')
        break
      case 'clear':
        if (!cells.length) {
          this.$message.error('请选择要删除的节点/边！')
          return
        }
        graph.removeCells(graph.getSelectedCells())
        break
      case 'fit':
        graph.zoomToFit()
        break
      case 'actualSize':
        graph.zoomTo(1)
        break
      case 'selectAll':
        const cell = graph.getCells()
        graph.resetSelection(cell)
        break
      case 'upload':
        this.$confirm({
          title: '提示',
          cancelText: '取消',
          okText: '确定',
          content: '上传JSON数据将覆盖当前画布，确认上传？',
          onOk: () => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.json'
            input.click()
            input.onchange = () => {
              // @ts-ignore
              const file = input.files[0]
              const reader = new FileReader()
              reader.readAsText(file, 'UTF-8')
              reader.onload = event => {
                try {
                  // @ts-ignore
                  const fileString = event.target.result
                  if (typeof fileString === "string") {
                    graph.fromJSON(JSON.parse(fileString))
                  }
                } catch (e) {
                  this.$message.error('上传JSON数据失败！')
                  console.error(' EDITOR ERROR:: upload JSON failed!', e)
                }
              }
            }
          }
        })
        break
      case 'print':
        graph.printPreview()
        break
      case 'fullScreen':
        if (screenfull.isEnabled) {
          screenfull.toggle()
        }
        break
      case 'zoomIn':
        if (zoom > 1.5) {
          this.$message.error('不能在放大了！')
          return false
        }
        graph.zoom(0.1)
        break
      case 'zoomOut':
        if (zoom < 0.5) {
          this.$message.error('不能在缩小了！')
          return false
        }
        graph.zoom(-0.1)
        break
      default:
        break
    }
  }
}
