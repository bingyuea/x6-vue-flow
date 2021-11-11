<template>
  <div>
    <div class="editor_toolbar_item" v-for="(item,index) in config" :key="index">
      <div v-if="item.icon" :class="`iconfont x-icon-${item.icon}`"></div>
      <div v-else-if="item.src"><img :src="item.src" alt=""></div>
      <slot v-else v-bind="item"/>

      <!--      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-undo"></div>
      </div>
      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-clear-log"></div>
      </div>
      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-redo"></div>
      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-copy"></div>
      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-paste"></div>
      </div>
      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-delete"></div>
      </div>

      <div class="editor_toolbar_item">
        100%
      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-zoom-in"></div>
      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-zoom-out"></div>
      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-fit"></div>
      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-actual-size"></div>
      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-fill"></div>
      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-line-color"></div>
      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-line-width"></div>
      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-flow-broken"></div>

      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-select-all"></div>

      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-edit"></div>

      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-upload"></div>
      </div>

      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-download"></div>
      </div>
      <div class="editor_toolbar_item">
        <div class="iconfont x-icon-full-screen"></div>
      </div>-->

    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
  name: 'toolbarItem',
})
export default class extends Vue {
  @Prop() private msg!: string;
  config = [
    {
      label: '',
      icon: "undo",
      src: ''
    },{
      label: '',
      icon: "clear-log",
      src: ''
    },{
      label: '',
      icon: "redo",
      src: ''
    },{
      label: '',
      icon: "copy",
      src: ''
    },
  ]
}
</script>
<style lang='less'>
</style>
