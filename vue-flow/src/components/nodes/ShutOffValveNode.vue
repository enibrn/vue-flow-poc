<script
  setup
  lang="ts"
>
import { Position, Handle, type NodeProps } from '@vue-flow/core'

// Define the props extending the NodeProps interface
defineProps<NodeProps>()
</script>

<template>
  <div class="shut-off-valve-node">
    <!-- Left handles -->
    <Handle
      id="left-top"
      type="target"
      :position="Position.Left"
      class="top"
    />
    <Handle
      id="left-bottom"
      type="target"
      :position="Position.Left"
      class="bottom"
    />

    <!-- Node image instead of standard rectangle -->
    <div class="valve-image-container">
      <img
        src="@/assets/nodes/ShutOffValve.png"
        alt="Shut Off Valve"
        class="valve-image"
      />
      <div class="node-label">{{ data.label }}</div>
    </div>

    <!-- Right handles -->
    <Handle
      id="right-top"
      type="source"
      :position="Position.Right"
      class="top"
    />
    <Handle
      id="right-bottom"
      type="source"
      :position="Position.Right"
      class="bottom"
    />
  </div>
</template>

<style scoped>
.shut-off-valve-node {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.valve-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.valve-image {
  height: 54px;
  object-fit: contain;
}

.node-label {
  font-size: 10px;
  margin-top: 5px;
  text-align: center;
}

/* Position the handles */
.top {
  top: 17%;
}

.bottom {
  top: 63%;
}
</style>