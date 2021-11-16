import ColorPicker from './ColorPicker/index.vue'
const componentList = {
  X6ColorPicker: ColorPicker
}

const components = {}
components.install = function(Vue, options) {
  for (const name in componentList) {
    if (name && componentList[name]) {
      Vue.component(name, componentList[name])
    }
  }
}

export default components
