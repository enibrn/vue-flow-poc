<script
  setup
  lang="ts"
>
import { Position, Handle, type NodeProps } from '@vue-flow/core'

// Define the props extending the NodeProps interface
defineProps<NodeProps>()
</script>

<template>
  <div class="uv-light-lamp-node">
    <!-- Top handles -->
    <Handle
      id="top-left"
      type="target"
      :position="Position.Top"
      class="handle top-left"
    />
    <Handle
      id="top-right"
      type="source"
      :position="Position.Top"
      class="handle top-right"
    />

    <!-- Node image instead of standard rectangle -->
    <div class="lamp-image-container">
      <img
        src="@/assets/nodes/UvLightLamp.png"
        alt="UV Light Lamp"
        class="lamp-image"
      />
      <div class="node-label">{{ data.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.uv-light-lamp-node {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lamp-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lamp-image {
  height: 70px;
  object-fit: contain;
}

.node-label {
  font-size: 10px;
  margin-top: 5px;
  text-align: center;
}

/* Position the handles horizontally */
.top-left {
  left: 30%;
}

.top-right {
  left: 70%;
}
</style>