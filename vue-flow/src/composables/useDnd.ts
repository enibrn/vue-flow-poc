import { useVueFlow } from '@vue-flow/core'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { GraphNode, XYPosition } from '@vue-flow/core'

let id = 0

/**
 * @returns {string} - A unique id.
 */
function getId(): string {
  return `dndnode_${id++}`
}

interface DndState {
  /**
   * The type of the node being dragged.
   */
  draggedType: Ref<string | null>
  isDragOver: Ref<boolean>
  isDragging: Ref<boolean>
}

/**
 * In a real world scenario you'd want to avoid creating refs in a global scope like this as they might not be cleaned up properly.
 */
const state: DndState = {
  draggedType: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false),
}

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  watch(isDragging, (dragging: boolean) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  function onDragStart(event: DragEvent, type: string): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type)
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedType.value = type
    isDragging.value = true

    document.addEventListener('drop', onDragEnd)
  }

  /**
   * Handles the drag over event.
   */
  function onDragOver(event: DragEvent): void {
    event.preventDefault()

    if (draggedType.value) {
      isDragOver.value = true

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  function onDragLeave(): void {
    isDragOver.value = false
  }

  function onDragEnd(): void {
    isDragging.value = false
    isDragOver.value = false
    draggedType.value = null
    document.removeEventListener('drop', onDragEnd)
  }

  /**
   * Handles the drop event.
   */
  function onDrop(event: DragEvent): void {
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    }) as XYPosition

    const nodeId = getId()

    const newNode = {
      id: nodeId,
      type: draggedType.value as string,
      position,
      data: { label: nodeId },
    }

    /**
     * Align node position after drop, so it's centered to the mouse
     *
     * We can hook into events even in a callback, and we can remove the event listener after it's been called.
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node: GraphNode) => ({
        position: { 
          x: node.position.x - (node.dimensions?.width || 0) / 2, 
          y: node.position.y - (node.dimensions?.height || 0) / 2 
        },
      }))

      off()
    })

    addNodes(newNode)
  }

  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
  }
}
