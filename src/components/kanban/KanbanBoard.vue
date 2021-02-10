<template>
  <v-container class="board">
    <v-row>
      <v-col cols="12" sm="4">
        <task-lane id="todo" title="To-Do" height="100%" :items="todoItems"></task-lane>
      </v-col>
      <v-col cols="12" sm="4">
        <task-lane id="inProgress" title="In Progress" height="100%" :items="inProgressItems"></task-lane>
      </v-col>
      <v-col cols="12" sm="4">
        <task-lane id="done" title="Done" height="100%" :items="doneItems"></task-lane>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import TaskLane from './TaskLane';

export default {
  name: 'KanbanBoard',
  components: {
    'task-lane': TaskLane,
  },
  computed: mapState({
    todoItems: store => store.items.todo,
    inProgressItems: store => store.items.inProgress,
    doneItems: store => store.items.done,
  }),
};
</script>
<style scoped>
.board {
  height: 100%;
}
</style>
