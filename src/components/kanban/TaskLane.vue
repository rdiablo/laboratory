<template>
  <v-card class="card" style="height:100%">
    <v-card-title>{{title}}</v-card-title>
    <v-card-text style="height:100%">
      <draggable v-model="draggables" group="default" style="background-color:transparent;height:100%">
        <v-container v-for="item in items" :key="item.id">
          <item :item="item"></item>
        </v-container>
      </draggable>
    </v-card-text>
    <v-card-text>
      {{itemCount}}
    </v-card-text>
  </v-card>
</template>

<script>
import Draggable from 'vuedraggable';
import TaskLaneItem from './TaskLaneItem';

export default {
  name: 'TaskLane',
  props: ['items', 'title', 'id'],
  components: {
    item: TaskLaneItem,
    draggable: Draggable,
  },
  computed: {
    itemCount() {
      if (this.items) return '';
      if (this.items.length === 1) return '1 task';
      return `${this.items.length} tasks`;
    },
    draggables: {
      get() {
        return this.items;
      },
      set(items) {
        this.$store.commit('updateItems', {
          items,
          id: this.id,
        });
      },
    },
  },
};
</script>


