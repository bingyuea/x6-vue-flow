<template>
  <div>
    <div class="editor_toolbar_item" @click="clickFn">
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
      <!--      <div command="edit" class="iconfont x-icon-edit" title="编辑"></div>-->
      <div command="upload" class="iconfont x-icon-upload" title="上传"></div>
      <a-dropdown>
        <div command="download" class="iconfont x-icon-download" title="下载"></div>
        <a-menu slot="overlay">
          <a-menu-item @click="saveFn('image')">
            <div>下载为图片</div>
          </a-menu-item>
          <a-menu-item @click="saveFn('json')">
            <div>下载为JSON数据</div>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <div command="fullScreen" class="iconfont x-icon-full-screen" title="全屏"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator'
import graph from '../../Graph/index'
import { DataUri } from '@antv/x6'
import dayjs from 'dayjs'
import { ToolbarFunctions } from '@/mixins/toolbarFunctions'
import Keyboard from '@/pages/Graph/event/keyboard'
@Component({
  name: 'toolbarItem'
})
export default class extends Mixins(ToolbarFunctions) {
  @Prop() private msg!: string
  GraphInstance: Record<string, any> = graph
  zoom: number = 1

  get graph() {
    return this.GraphInstance.graph
  }
  get line() {
    return this.GraphInstance.line
  }
  async mounted() {
    await this.$nextTick()
    this.init()
  }
  init() {
    const graph = this.graph.on('scale', () => {
      this.zoom = graph.zoom()
    })
    // 注册事件
    Keyboard.init.call(this, this.graph)
  }
  setBackgroundColor(color: string) {
    this.graph.drawBackground({
      color
    })
  }
  // todo fix
  setLineColor(color: string) {
    this.line.setAttrByPath('line/stroke', '#f0f')
  }
  saveFn(type: string) {
    const cell = this.graph.getCells()
    if (!cell.length) {
      this.$message.error('画布内容为空！')
      return
    }
    const graph = this.graph
    const now = dayjs().format('YYYYMMDDHHmmss')
    switch (type) {
      case 'image':
        graph.toPNG((datauri: string) => {
          DataUri.downloadDataUri(datauri, `${now}.png`)
        })
        break
      case 'json':
        const json = graph.parseJSON(graph.toJSON())
        const content = JSON.stringify(json)
        console.log(content)
        const blob = new Blob([content], {
          type: 'application/json;charset=UTF-8'
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.textContent = 'download json'
        link.href = url
        link.download = `${now}.json`
        link.click()
        URL.revokeObjectURL(url)
        break
      default:
        break
    }
  }
  clickFn(e: Event) {
    this.handleClick(this.graph, e.target.getAttribute('command'))
  }
}
</script>
