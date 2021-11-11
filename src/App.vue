<template>
  <div class='x6_editor'>
    <div class="x6_editor_toolbar">
      <ToolBar/>
    </div>
    <div class="x6_editor_e">
      <div class="x6_editor_e_sidebar"></div>
      <div id="container" class="x6-graph" style="width:100% !important;height:100% !important"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import FlowGraph from './pages/Graph'
import ToolBar from './pages/components/ToolBar/index.vue'
import EditorItemPanel from './pages/components/Tree/ItemPanel.vue'
import {Graph, Addon, Shape, Edge} from '@antv/x6'

import {
  FlowChartRect,
  FlowChartImageRect,
  FlowChartTitleRect,
  FlowChartAnimateText,
  NodeGroup,
  EdgeArrow
} from './pages/Graph/shape'
import {EmbeddedImage} from '@antv/x6/lib/shape/standard'
import EditorDetailPanel from './pages/components/ConfigPanel/index.vue'
const { Dnd } = Addon

@Component({
  name: 'x6Editor',
  components: {
    ToolBar,
  },
})
export default class extends Vue {
  // @Prop() private msg!: readOnly;
  current  = ''
  leftMenu = true
  rightMenu = true
  graph:any = null
  dnd:any = null
  flow_title = '流程设计'

  created() {
    this.$nextTick(() => {
      this.graph = FlowGraph.init();
      this.dnd = new Dnd({target: this.graph, animation: true, validateNode: this.validate, getDropNode: this.dragNode})

      this.graph.on('edge:connected', (item) => {
        //edge
        if (item.edge) {
          //1. 处理模式
          //a. 获取节点目标终节点
          //item.edge.target.cell
          let target = this.graph.getCell(item.edge.target?.cell);
          let source = this.graph.getCell(item.edge.source?.cell);
          if (!target || !source) return
          console.info('添加完成');
          //目标为or模式
          if (target.getData()?.groupType == 100) {
            //1.设置当前lineType
            item.edge.setData({...item.edge.getData(), lineType: 100})
            //or模式，需要自动添加其他组内连接点
            let groupNodes = this.graph.getNodes().filter(t => t.parent == target.parent && t.id != target.id)
            groupNodes.forEach(item => {
              let findEdge = this.graph.getEdges().filter(p => p.source.cell == source.id && p.target.cell == item.id)
              if (findEdge.length <= 0) {
                let tedge = this.graph.addEdge(new EdgeArrow({
                  source: {cell: source.id, port: source.getPorts().find(t => t.group == 'bottom')?.id},
                  target: {cell: item.id, port: item.getPorts().find(t => t.group == 'top')?.id}, data: {lineType: 100}
                }))
              }
            })
          }
          //源为or模式
          else if (source.getData()?.groupType == 100) {
            //1.设置当前lineType
            item.edge.setData({...item.edge.getData(), lineType: 100})
            //or模式，需要自动添加其他组内连接点
            let groupNodes = this.graph.getNodes().filter(t => t.parent == source.parent && t.id != source.id)
            groupNodes.forEach(item => {
              let findEdge = this.graph.getEdges().filter(p => p.source.cell == item.id && p.target.cell == target.id)
              if (findEdge.length <= 0) {
                let tedge = this.graph.addEdge(new EdgeArrow({
                  source: {cell: item.id, port: item.getPorts().find(t => t.group == 'bottom')?.id},
                  target: {cell: target.id, port: target.getPorts().find(t => t.group == 'top')?.id},
                  data: {lineType: 100}
                }))
              }
            })
          }
        }
      })
      this.graph.on('edge:removed', (item) => {
      })
      this.resizeFn()
    })
  }


  generateUUID() {
    let result = ''
    var d = new Date().getTime()
    result += d.toString()
    let rand = Math.random() * 100
    if (rand < 10) {
      result += '000' + rand.toString().substring(0, 1)
    } else if (rand < 100) {
      result += '00' + rand.toString().substring(0, 2)
    } else if (rand < 1000) {
      result += '0' + rand.toString().substring(0, 3)
    } else {
      result += rand.toString().substring(0, 4)
    }
    return result
  }

  dragNode(node) {
    if (node?.data?.children?.length > 0) {
      let parentId = this.generateUUID();
      let children = node.data.children
      let point = this.graph.clientToLocal({x: window.event.x, y: window.event.y})
      let index = 0;
      let nodes = []
      //1.添加组内节点
      children.forEach(t => {
        let item_node = new FlowChartRect({
          label: t.title,
          data: t,
          width: 81,
          height: 45,
          x: point.x,
          y: point.y + index,
          groupType: 0,
          parent: parentId
        })
        index += 80
        nodes.push(this.graph.addNode(item_node));
      })
      //2.添加连线
      if (nodes.length > 1) {
        for (let k = 0; k < nodes.length - 1; k++) {
          this.graph.addEdge(new EdgeArrow({
            source: {cell: nodes[k].id, port: nodes[k].getPorts().find(t => t.group == 'bottom')?.id},
            target: {cell: nodes[k + 1].id, port: nodes[k + 1].getPorts().find(t => t.group == 'top')?.id}
          }))
        }
      }
      //3.添加群组
      let group = new NodeGroup({
        attrs: {
          text: {
            text: node.data.title,
          },
        },
        data: {
          children: node.data.children,
          parent: true,
          maxHeight: 40 + 45 * nodes.length + 35 * (nodes.length - 1),
        },
        id: parentId,
        groupType: 0,
        x: point.x - 70,
        y: point.y - 30,
        collapsed: false,
        width: 121,
        zIndex: 1
      });
      let parentNode = this.graph.addNode(group)
      //4.添加群组关系
      nodes.forEach(item => {
        //item.setParent(parentNode)
        parentNode.addChild(item)
        console.info('parent', item.getParent())
      })
    }
    return node.clone()
  }

  validate(node) {
    console.info('getNode', node);
    if (node?.data?.children?.length > 0) {
      return false
    }
    return true
  }

  getContainerSize() {
    return {
      width: document.body.offsetWidth,
      height: document.body.offsetHeight - 84,
    }
  }
  resizeFn(side:Record<string, any>) {
    const {width,height} = this.getContainerSize()
    this.graph.resize(width, height)
  }
}
</script>

<style lang="less" scoped>
.x6_editor {
  height: 100%;
  width: 100%;
  @toolbar_height: 84px;

  &_toolbar {
    height: @toolbar_height;
    width: 100%;
    padding: 0 15px;
  }

  &_e {
    height: calc(100% - @toolbar_height);
    background: #F2F2F2;
    width: 100%;
    position: relative;

    &_sidebar {
      display: none;
      position: absolute;
      background: #09576a;
      top: 0;
      bottom: 0;
      width: 64px;
    }
  }
}
</style>
