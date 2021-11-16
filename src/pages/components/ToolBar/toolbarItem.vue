<template>
  <div>
    <div class="editor_toolbar_item" @click="handleClick">
      <div command="undo" class="iconfont x-icon-undo" title="撤销（Ctrl + Z）"></div>
      <div command="redo" class="iconfont x-icon-redo" title="重做 (Ctrl + shift + Z)"></div>
      <div command="copy" class="iconfont x-icon-copy" title="复制 (Ctrl + C)"></div>
      <div command="paste" class="iconfont x-icon-paste" title="粘贴 (Ctrl + V)"></div>
      <div command="clear" class="iconfont x-icon-clear" title="删除 (Ctrl + Shift + C)"></div>
      <div command="zoomIn" class="iconfont x-icon-zoom-in" title="放大 (Ctrl + +)"></div>
      <div command="zoomOut" class="iconfont x-icon-zoom-out" title="缩小 (Ctrl + -)"></div>
      <div command="fit" class="iconfont x-icon-fit" title="适应屏幕 (Ctrl + 0)"></div>
      <div command="actualSize" class="iconfont x-icon-actual-size" title="实际大小 (Ctrl + 1)"></div>

      <X6ColorPicker @on-change="color => setBackgroundColor(color)">
        <div command="fill" class="iconfont x-icon-fill" title="填充背景色"></div>
      </X6ColorPicker>

      <X6ColorPicker @on-change="color => setLineColor(color)">
        <div command="lineColor" class="iconfont x-icon-line-color" title="线条颜色"></div>
      </X6ColorPicker>
      <div command="lineWidth" class="iconfont x-icon-line-width" title="线条宽度"></div>
      <!--      <div command="flowBroken" class="iconfont x-icon-flow-broken"></div>-->
      <div command="selectAll" class="iconfont x-icon-select-all" title="全选 (Ctrl + A)"></div>
      <div command="edit" class="iconfont x-icon-edit" title="编辑"></div>
      <div command="upload" class="iconfont x-icon-upload" title="上传"></div>
      <div command="download" class="iconfont x-icon-download" title="下载"></div>
      <div command="fullScreen" class="iconfont x-icon-full-screen" title="全屏"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import graph from '../../Graph/index'
import { X6Line } from '../../Graph/edge/registerEdge'
@Component({
  name: 'toolbarItem'
})
export default class extends Vue {
  @Prop() private msg!: string
  GraphInstance: Record<string, any> = graph
  zoom: number = 1

  get graph() {
    return this.GraphInstance.graph
  }
  async mounted() {
    await this.$nextTick()
    this.init()
  }
  init() {
    const graph = this.graph.on('scale', () => {
      this.zoom = graph.zoom()
    })
  }
  setBackgroundColor(color: string) {
    this.graph.drawBackground({
      color
    })
  }
  setLineColor(color: string) {
    this.graph.createEdge = () => {
      return new X6Line({
        attrs: {
          line: {
            stroke: '#f0f',
            strokeWidth: 1,
            targetMarker: {
              name: 'classic',
              size: 8
            }
          }
        },
        router: {
          name: 'manhattan'
        }
      })
    }
  }
  handleClick(e: Event) {
    console.log(e)
    const graph = this.graph
    const commandName = e.target.getAttribute('command')
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
        graph.copy(graph.getSelectedCells(), true, true)
        this.$message.success('已复制')
        break
      case 'paste':
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
      case 'fill':
        return
        break
      case 'print':
        graph.printPreview()
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
</script>
