<template>
  <div>
    <a-form readonly>
      <a-form-item label="类型：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-select :disabled="readOnly" @change="changeType">
          <a-select-option value="dot">dot</a-select-option>
          <a-select-option value="fixedDot">fixedDot</a-select-option>
          <a-select-option value="mesh">mesh</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="颜色：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <ColorPicker :disabled="readOnly" @update="changeColor" />
      </a-form-item>
      <a-form-item label="大小：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-slider :min="1" :max="20" :disabled="readOnly" @change="changeSize" />
      </a-form-item>
      <a-form-item label="宽度：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-slider :min="1" :max="5" :disabled="readOnly" @change="changeWidth" />
      </a-form-item>
    </a-form>
    <slot name="flow"></slot>
  </div>
</template>
<script>
import ColorPicker from '../../ColorPicker/index'
export default {
  name: 'GraphPanel',
  components: { ColorPicker },
  props: ['type', 'readOnly', 'formModel', 'graph'],
  data() {
    return {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 18 }
      },
      options: {
        type: 'dot',
        args: [
          {
            color: '#000',
            thickness: 1
          }
        ]
      }
    }
  },
  methods: {
    changeType(val) {
      this.options.type = val
      this.graph.drawGrid(this.options)
    },
    changeColor(val) {
      this.options.args[0].color = val
      this.graph.drawGrid(this.options)
    },
    changeSize(val) {
      this.graph.setGridSize(val)
    },
    changeWidth(val) {
      this.options.args[0].thickness = val
      this.graph.drawGrid(this.options)
    }
  }
}
</script>
