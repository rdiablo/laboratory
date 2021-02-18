<template>
  <v-card
      elevation="0"
      outlined class="card pa-0 ma-0" style="height:inherit;width:340px;background:#f9f9f9">
    <v-card-title style="white-space: nowrap;">{{title}} {{itemCount}}</v-card-title>
    <v-card-text style="height:inherit;" class="card pa-0 ma-0 pt-16 mt-n16">
      <draggable v-model="draggables" group="default" style="height:inherit;overflow:auto;">
        <v-container class="pt-0" v-for="item in items" :key="item.id" style="display:block">
          <item :item="item"></item>
        </v-container>
      </draggable>
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


