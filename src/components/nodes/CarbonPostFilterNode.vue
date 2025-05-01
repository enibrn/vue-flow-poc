<script
  setup
  lang="ts"
>
import { Position, Handle, type NodeProps } from '@vue-flow/core'

// Define the props extending the NodeProps interface
defineProps<NodeProps>()
</script>

<template>
  <div class="carbon-post-filter-node">
    <!-- Left handle -->
    <Handle
      id="left"
      type="target"
      :position="Position.Left"
      class="left"
    />

    <!-- Right handle -->
    <Handle
      id="right"
      type="source"
      :position="Position.Right"
      class="right"
    />

    <!-- Node image instead of standard rectangle -->
    <div class="filter-image-container">
      <img
        src="@/assets/nodes/CarbonPostFilter.png"
        alt="Carbon Post Filter"
        class="filter-image"
      />
      <div class="node-label">{{ data.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.carbon-post-filter-node {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-image {
  height: 60px;
  object-fit: contain;
}

.node-label {
  font-size: 10px;
  margin-top: 5px;
  text-align: center;
}

.right {
  top: 40%;
}

.left {
  top: 40%;
}
</style>