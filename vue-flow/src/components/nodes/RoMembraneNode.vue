<script
  setup
  lang="ts"
>
import { Position, Handle, type NodeProps } from '@vue-flow/core'

// Define the props extending the NodeProps interface
defineProps<NodeProps>()
</script>

<template>
  <div class="ro-membrane-node">
    <!-- Left handles (2) -->
    <Handle
      id="left-top"
      type="target"
      :position="Position.Left"
      class="handle left-top"
    />
    <Handle
      id="left-bottom"
      type="target"
      :position="Position.Left"
      class="handle left-bottom"
    />

    <!-- Right handle (1) -->
    <Handle
      id="right"
      type="source"
      :position="Position.Right"
      class="handle right"
    />

    <!-- Node image instead of standard rectangle -->
    <div class="membrane-image-container">
      <img
        src="@/assets/nodes/RoMembrane.png"
        alt="RO Membrane"
        class="membrane-image"
      />
      <div class="node-label">{{ data.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.ro-membrane-node {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.membrane-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.membrane-image {
  height: 100px;
  object-fit: contain;
}

.node-label {
  font-size: 10px;
  margin-top: 5px;
  text-align: center;
}

/* Position the handles */
.left-top {
  top: 24%;
  left: 2%;
}

.left-bottom {
  top: 45%;
}

.right {
  top: 43%;
}
</style>