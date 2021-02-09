<template>
<KanbanBoard></KanbanBoard>
</template>


<script>
// @ is an alias to /src
import KanbanBoard from '@/components/kanban/KanbanBoard.vue'

export default {
  name: 'Kanban',
  components: {
    KanbanBoard
  }
}
</script>
