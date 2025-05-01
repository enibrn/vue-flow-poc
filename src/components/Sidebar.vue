<script
  setup
  lang="ts"
>
import useDragAndDrop from '../composables/useDnd.ts'

const { onDragStart } = useDragAndDrop()
</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane.</div>

    <div class="nodes">
      <div
        class="vue-flow__node-input"
        :draggable="true"
        @dragstart="onDragStart($event, 'input')"
      >Input Node</div>

      <div
        class="vue-flow__node-default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
      >Default Node</div>

      <div
        class="vue-flow__node-output"
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
      >Output Node</div>

      <!-- Valve node with exact same structure as other nodes -->
      <div
        class="vue-flow__node-default valve-node-item"
        :draggable="true"
        @dragstart="onDragStart($event, 'shutOffValve')"
      >
        <img
          src="@/assets/nodes/ShutOffValve.png"
          alt="Shut-off Valve"
          class="valve-preview-img"
        />
        <span>Shut-off Valve</span>
      </div>

      <!-- Aggiungi il nodo UV Light Lamp alla sidebar -->
      <div
        class="vue-flow__node-default lamp-node-item"
        :draggable="true"
        @dragstart="onDragStart($event, 'uvLightLamp')"
      >
        <img
          src="@/assets/nodes/UvLightLamp.png"
          alt="UV Light Lamp"
          class="lamp-preview-img"
        />
        <span>UV Light Lamp</span>
      </div>

      <!-- RO Membrane node nella sidebar -->
      <div
        class="vue-flow__node-default membrane-node-item"
        :draggable="true"
        @dragstart="onDragStart($event, 'roMembrane')"
      >
        <img
          src="@/assets/nodes/RoMembrane.png"
          alt="RO Membrane"
          class="membrane-preview-img"
        />
        <span>RO Membrane</span>
      </div>

      <!-- Carbon Post Filter node nella sidebar -->
      <div
        class="vue-flow__node-default carbon-node-item"
        :draggable="true"
        @dragstart="onDragStart($event, 'carbonPostFilter')"
      >
        <img
          src="@/assets/nodes/CarbonPostFilter.png"
          alt="Carbon Post Filter"
          class="carbon-preview-img"
        />
        <span>Carbon Post Filter</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Stile base del nodo valvola con dimensioni fisse */
.valve-node-item {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  width: 150px !important;
  /* Rimuoviamo il colore fisso e lo sfondo fisso per permettere la variazione in base al tema */
}

.valve-preview-img {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  object-fit: contain;
}

/* Aggiungiamo classi specifiche che verranno applicate a livello globale */
:global(.vue-flow__node-default.valve-node-item) {
  background-color: #f5f5f5;
  color: #333;
}

:global(.dark .vue-flow__node-default.valve-node-item) {
  background-color: #333;
  color: #fff;
}

/* Stile per il nodo UV Light Lamp nella sidebar */
.lamp-node-item {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  width: 150px !important;
}

.lamp-preview-img {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  object-fit: contain;
}

/* Stili per adattamento dark mode */
:global(.vue-flow__node-default.lamp-node-item) {
  background-color: #f5f5f5;
  color: #333;
}

:global(.dark .vue-flow__node-default.lamp-node-item) {
  background-color: #333;
  color: #fff;
}

/* Stile per il nodo RO Membrane nella sidebar */
.membrane-node-item {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  width: 150px !important;
}

.membrane-preview-img {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  object-fit: contain;
}

/* Stili per adattamento dark mode */
:global(.vue-flow__node-default.membrane-node-item) {
  background-color: #f5f5f5;
  color: #333;
}

:global(.dark .vue-flow__node-default.membrane-node-item) {
  background-color: #333;
  color: #fff;
}

/* Stile per il nodo Carbon Post Filter nella sidebar */
.carbon-node-item {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  width: 150px !important;
}

.carbon-preview-img {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  object-fit: contain;
}

/* Stili per adattamento dark mode */
:global(.vue-flow__node-default.carbon-node-item) {
  background-color: #f5f5f5;
  color: #333;
}

:global(.dark .vue-flow__node-default.carbon-node-item) {
  background-color: #333;
  color: #fff;
}
</style>
