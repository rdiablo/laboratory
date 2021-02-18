<template>
<v-app>
<TaskLane></TaskLane>
</v-app>
</template>


<script>
// @ is an alias to /src
import TaskLane from '@/components/kanban/Backlog.vue'

export default {
  name: 'Task',
  components: {
    TaskLane
  }
}
</script>
