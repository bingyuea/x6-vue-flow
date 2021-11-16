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
        <ColorPicker v-model="formModel.stroke" :disabled="readOnly" @update="changeColor" />
      </a-form-item>
      <a-form-item label="宽度：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-slider v-model="formModel.strokeWidth" :min="1" :max="5" :disabled="readOnly" @change="changeWidth" />
      </a-form-item>
      <a-form-item v-model="formModel.connector" label="形状：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-select :disabled="readOnly" @change="onConnectorChange">
          <a-select-option value="normal">Normal</a-select-option>
          <a-select-option value="smooth">Smooth</a-select-option>
          <a-select-option value="rounded">Rounded</a-select-option>
          <!-- <a-select-option value="jumpover">Jumpover</a-select-option> -->
        </a-select>
      </a-form-item>
      <a-form-item label="起点：">
        <a-select v-model="formModel.sourceMarker" :disabled="readOnly" @change="onStartChange">
          <a-select-option value="block">block</a-select-option>
          <a-select-option value="classic">classic</a-select-option>
          <a-select-option value="diamond">diamond</a-select-option>
          <a-select-option value="cross">cross</a-select-option>
          <a-select-option value="async">async</a-select-option>
          <a-select-option value="path">path</a-select-option>
          <a-select-option value="circle">circle</a-select-option>
          <a-select-option value="circlePlus">circlePlus</a-select-option>
          <a-select-option value="ellipse">ellipse</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="终点：">
        <a-select v-model="formModel.targetMarker" :disabled="readOnly" @change="onEndChange">
          <a-select-option value="block">block</a-select-option>
          <a-select-option value="classic">classic</a-select-option>
          <a-select-option value="diamond">diamond</a-select-option>
          <a-select-option value="cross">cross</a-select-option>
          <a-select-option value="async">async</a-select-option>
          <a-select-option value="path">path</a-select-option>
          <a-select-option value="circle">circle</a-select-option>
          <a-select-option value="circlePlus">circlePlus</a-select-option>
          <a-select-option value="ellipse">ellipse</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <slot name="edge"></slot>
  </div>
</template>
<script>
import ColorPicker from '../../ColorPicker/index'
export default {
  name: 'EdgePanel',
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
    onConnectorChange(val) {
      this.cell.setConnector(val)
    },
    changeColor(val) {
      this.cell.attr('line/stroke', val)
    },
    changeLabel(e) {
      const { value } = e.target
      this.cell.setLabels([{ attrs: { label: { text: value } } }])
    },
    changeWidth(val) {
      console.info('kuandu', val)
      this.cell.attr('line/strokeWidth', val)
    },
    onStartChange(val) {
      this.cell.attr('line/sourceMarker', val)
    },
    onEndChange(val) {
      this.cell.attr('line/targetMarker', val)
    }
  }
}
</script>
