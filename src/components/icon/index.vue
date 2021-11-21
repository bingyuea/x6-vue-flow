<template>
  <icon-font></icon-font>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'x-icon'
})
export default class extends Vue {
  @Prop() private msg!: string
}
</script>

<style scoped></style>
