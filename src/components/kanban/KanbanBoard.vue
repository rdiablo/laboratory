<template>
    <v-card elevation="0" class="d-flex flex-nowrap mr-0 pa-0 mb-n16" style="height:inherit;">
      <!-- {{ :sm="12/parseInt((Object.getOwnPropertyNames(items).length-1))" }} -->
      <v-card elevation="0" class="d-flex flex-sm-column mr-2 pa-0" v-for="(item , index) in items" :key="item.text" style="height:inherit;">
        <task-lane :id="index" :title="index" :items="item"></task-lane>
      </v-card>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';
import TaskLane from './TaskLane';

export default {
  name: 'KanbanBoard',
  components: {
    'task-lane': TaskLane,
  },
  // computed: mapState({
  //   todoItems: store => store.items.todo,
  //   inProgressItems: store => store.items.inProgress,
  //   doneItems: store => store.items.done,
  // }),
  computed: mapState({
    items:state => state.items,
    // itemkey: state => Object.keys(state.items)
  }),
};
</script>
<style scoped>
</style>
