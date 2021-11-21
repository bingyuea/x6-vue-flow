<template>
  <div>
    <div
      style="background-color: rgb(218, 218, 218);
    height: 40px;"
    >
      <AreaTitle title="属性" style="padding-left: 15px;"></AreaTitle>
    </div>
    <a-form readonly>
      <a-form-item label="名称：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input v-model="formModel.label" style="font-size:12px" :disabled="readOnly" @change="changeLabel" />
      </a-form-item>
      <a-form-item label="颜色：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <ColorPicker v-model="formModel.fontColor" :disabled="readOnly" @update="changeColor" />
      </a-form-item>
      <a-form-item label="大小：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-slider v-model="formModel.fontSize" :min="8" :max="16" :disabled="readOnly" @change="changeFontSize" />
      </a-form-item>
      <a-form-item label="背景色：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <ColorPicker v-model="formModel.backColor" :disabled="readOnly" @update="changeBackColor" />
      </a-form-item>
      <!-- <a-form-item label="宽度：" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-slider :min="1" :max="5"  :disabled="readOnly" @change="changeWidth"/>
        </a-form-item> -->
    </a-form>
    <slot name="edge"></slot>
  </div>
</template>
<script>
import ColorPicker from '../../ColorPicker/index'
export default {
  name: 'NodePanel',
  components: { ColorPicker },
  props: ['type', 'readOnly', 'formModel', 'cell'],
  data() {
    return {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 18 }
      }
    }
  },
  methods: {
    changeColor(val) {
      this.cell.attr('text/fill', val)
    },
    changeLabel(e) {
      const { value } = e.target
      this.cell.attr('text/text', value)
    },
    changeFontSize(val) {
      this.cell.attr('text/fontSize', val)
    },
    changeBackColor(val) {
      this.cell.attr('body/fill', val)
    }
  }
}
</script>
