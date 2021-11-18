<template>
  <div class="toolbarOptions">
    <!--    <div class="file_toolbar">
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item key="mail">
          <a-icon type="folder" />
          文件
        </a-menu-item>
        <a-menu-item key="app">
          <a-icon type="setting" />
          操作
        </a-menu-item>
        <a-sub-menu>
          <span slot="title" class="submenu-title-wrapper">
            <a-icon type="tool" />
            工具包
          </span>
          <a-menu-item-group title="Item 1">
            <a-menu-item key="setting:1">
              Option 1
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-menu-item key="alipay">
          <a-icon type="question-circle" />
          帮助
        </a-menu-item>
      </a-menu>
    </div>-->

    <div class="editor_toolbar">
      <toolbarItem :graph="graph"></toolbarItem>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import toolbarItem from './toolbarItem.vue'
import { Graph } from '@antv/x6'

@Component({
  name: 'toolbar',
  components: {
    toolbarItem
  }
})
export default class extends Vue {
  @Prop() public graph!: Graph
  current = ['mail']
}
</script>

<style lang="less">
.toolbarOptions {
  .file_toolbar,
  .editor_toolbar {
    height: 36px;
    line-height: 36px;
    &_item {
      display: inline-block;
      min-width: 25px;
      line-height: 1;
      vertical-align: middle;
      text-align: center;
      margin: 0 2px;
      color: #000000;
      font-size: 17px;
      .iconfont {
        display: inline-block;
        cursor: pointer;
      }
      .iconfont + .iconfont {
        margin: 5px;
      }
    }
  }
  .file_toolbar {
    .ant-menu-horizontal {
      height: 100%;
      line-height: 36px;
    }
  }
  .editor_toolbar {
  }
}
</style>
