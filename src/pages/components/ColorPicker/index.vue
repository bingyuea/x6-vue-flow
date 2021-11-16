<template>
  <a-popover v-model="visible" trigger="click">
    <template slot="content">
      <div class="color-picker-box">
        <Sketch class="sketch-picker" :value="color" :preset-colors="presetColors" @input="handleChange"></Sketch>
        <div class="btn-block">
          <a-button class="btn" type="default" size="small" @click="doHide">关闭</a-button>
          <a-button class="btn" type="primary" size="small" @click="doConfirm">确认</a-button>
        </div>
      </div>
    </template>
    <slot></slot>
  </a-popover>
</template>

<script>
import { Sketch } from 'vue-color'
export default {
  name: 'ColorPicker',
  components: {
    Sketch
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    presetColors: {
      type: Array,
      default: () => [
        '#2d8cf0',
        '#19be6b',
        '#ff9900',
        '#ed4014',
        '#00b5ff',
        '#19c919',
        '#f9e31c',
        '#ea1a1a',
        '#9b1dea',
        '#00c2b1',
        '#ac7a33',
        '#1d35ea',
        '#8bc34a',
        '#f16b62',
        '#ea4ca3',
        '#0d94aa',
        '#febd79',
        '#5d4037',
        '#00bcd4',
        '#f06292',
        '#cddc39',
        '#607d8b',
        '#000000',
        '#ffffff'
      ]
    }
  },
  data() {
    return {
      visible: false,
      color: ''
    }
  },
  watch: {
    value(val) {
      const _t = this
      _t.color = val
    }
  },
  methods: {
    doHide() {
      const _t = this
      _t.visible = false
      _t.$emit('on-close')
    },
    handleChange(val) {
      const _t = this
      _t.color = typeof val === 'object' && val.hasOwnProperty('hex8') ? val.hex8 : ''
      _t.$emit('input', _t.color)
    },
    doConfirm() {
      const _t = this
      _t.$emit('on-change', _t.color)
      _t.doHide()
    }
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.color-picker-box {
  position: relative;
  .sketch-picker {
    border: none;
    box-shadow: none;
  }
  .btn-block {
    text-align: right;
    padding: 10px;
    border-top: 1px solid #eee;

    .btn {
      & + .btn {
        margin-left: 10px;
      }
    }
  }
}
</style>
