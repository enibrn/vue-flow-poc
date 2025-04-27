<script
  setup
  lang="ts"
>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { initialEdges, initialNodes } from './initial-elements.js'
import Icon from './components/Icon.vue'
import useDragAndDrop from './composables/useDnd.js'
import DropzoneBackground from './components/DropzoneBackground.vue'
import Sidebar from './components/Sidebar.vue'
import ShutOffValveNode from './components/nodes/ShutOffValveNode.vue'

// Define custom node types
const nodeTypes = {
  shutOffValve: ShutOffValveNode,
}

/**
 * `useVueFlow` provides:
 * 1. a set of methods to interact with the VueFlow instance (like `fitView`, `setViewport`, `addEdges`, etc)
 * 2. a set of event-hooks to listen to VueFlow events (like `onInit`, `onNodeDragStop`, `onConnect`, etc)
 * 3. the internal state of the VueFlow instance (like `nodes`, `edges`, `viewport`, etc)
 */
const { onInit, onNodeDragStop, onConnect, addEdges, addNodes, setViewport, toObject } = useVueFlow()

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

// Adding a shut-off valve node example to initial nodes
const customNodes = [
  ...initialNodes,
  {
    id: 'valve-1',
    type: 'shutOffValve',
    data: { label: 'Shut-off Valve' },
    position: { x: 250, y: 200 },
  }
];

const nodes = ref(customNodes)
const edges = ref(initialEdges)

// our dark mode toggle flag
const dark = ref(false)

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 * Any event that is available as `@event-name` on the VueFlow component is also available as `onEventName` on the composable and vice versa
 *
 * onInit is called when the VueFlow viewport is initialized
 */
onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView()
})

/**
 * onNodeDragStop is called when a node is done being dragged
 *
 * Node drag events provide you with:
 * 1. the event object
 * 2. the nodes array (if multiple nodes are dragged)
 * 3. the node that initiated the drag
 * 4. any intersections with other nodes
 */
onNodeDragStop(({ event, nodes, node }) => {
  console.log('Node Drag Stop', { event, nodes, node })
})

/**
 * onConnect is called when a new connection is created.
 *
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether by not calling `addEdges`
 */
onConnect((connection) => {
  addEdges(connection)
})

/**
 * To update a node or multiple nodes, you can
 * 1. Mutate the node objects *if* you're using `v-model`
 * 2. Use the `updateNode` method (from `useVueFlow`) to update the node(s)
 * 3. Create a new array of nodes and pass it to the `nodes` ref
 */
function updatePos() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    }
  })
}

/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}

function toggleDarkMode() {
  dark.value = !dark.value
}
</script>

<template>
  <div
    class="dnd-flow"
    @drop="onDrop"
  >
    <Sidebar :class="{ dark }" />
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :node-types="nodeTypes"
      :class="{ dark }"
      class="basic-flow"
      :default-viewport="{ zoom: 1.5 }"
      :min-zoom="0.2"
      :max-zoom="4"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <DropzoneBackground :style="{
        backgroundColor: isDragOver ? (dark ? '#6a7a95' : '#e7f3ff') : 'transparent',
        transition: 'background-color 0.2s ease',
      }">
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>

      <MiniMap />

      <Controls position="top-left">
        <ControlButton
          title="Reset Transform"
          @click="resetTransform"
        >
          <Icon name="reset" />
        </ControlButton>

        <ControlButton
          title="Toggle Dark Mode"
          @click="toggleDarkMode"
        >
          <Icon
            v-if="dark"
            name="sun"
          />
          <Icon
            v-else
            name="moon"
          />
        </ControlButton>
      </Controls>
    </VueFlow>
  </div>
</template>
