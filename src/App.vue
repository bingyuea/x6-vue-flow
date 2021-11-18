<template>
  <div class="x6_editor">
    <div class="x6_editor_toolbar">
      <ToolBar :graph="graph" />
    </div>
    <div class="x6_editor_e">
      <div class="x6-stencil"></div>
      <div class="x6-graph" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator'
import FlowGraph from './pages/Graph'
import ToolBar from './pages/components/ToolBar/index.vue'
import { Graph, Addon, Shape, Edge } from '@antv/x6'
import { FlowChartRect, NodeGroup, EdgeArrow } from './pages/Graph/shape'
import registerNode from '@/pages/Graph/shape/registerNode'
import registerEdge from '@/pages/Graph/edge/registerEdge'
import Keyboard from '@/pages/Graph/event/keyboard'
const { Dnd } = Addon
@Component({
  name: 'x6Editor',
  components: {
    ToolBar
  }
})
export default class extends Vue {
  current = ''
  graph: any = null
  dnd: any = null
  mounted() {
    this.init()
  }

  init() {
    // todo 需要做已有处理
    registerNode()
    registerEdge()
    this.graph = FlowGraph.init()
    // 注册拖拽
    this.dnd = new Dnd({
      target: this.graph,
      animation: true
    })
    this.getContainerSize()
  }

  getContainerSize() {
    const width = document.body.offsetWidth - 280,
      height = document.body.offsetHeight - 36
    this.graph.resize(width, height)
  }
}
</script>

<style lang="less" scoped>
.x6_editor {
  height: 100%;
  width: 100%;
  @toolbar_height: 36px;
  @sidebar_width: 280px;

  &_toolbar {
    height: @toolbar_height;
    width: 100%;
    padding: 0 15px;
  }

  &_e {
    height: calc(100% - @toolbar_height);
    background: #f2f2f2;
    width: 100%;
    position: relative;
    display: flex;

    & .x6-graph {
      flex: 1;
      display: flex;
    }

    & .x6-stencil {
      background: #fff;
      width: @sidebar_width;
      display: inline-block;
      position: relative;
      height: 100%;
    }
  }
}
</style>
