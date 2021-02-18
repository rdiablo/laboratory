<template>
  <v-row no-gutters>
    <v-col>
      <v-card
        elevation="0"
        tile
        outlined
        class="rounded"
      >
      <v-toolbar
        :color="bcolor"
        class="elevation-0"
        dense
      ></v-toolbar>
        <v-list-item>
          <v-list-item-content>
            <div class="overline">
              #{{item.id}}
            </div>
            <v-list-item-title>
              {{item.text}}
            </v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar
            tile
            size="40"
            color="secondary"
          ></v-list-item-avatar>
        </v-list-item>
        
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TaskLaneItem',
  props: ['item'],
  data () {
    return {
      selected: [],
      // myitem : this.$store.state.items.done
      bcolor: 'secondary'
    }
  },
  computed: {
    itemCount() {
      if (this.items) return '';
      if (this.items.length === 1) return '1 task';
      return `${this.items.length} tasks`;
    },
  },
  watch: {
    '$store.state.items': {
        immediate: true,
        handler() {
          this.getColor()
          console.log('看板变化')
        }
     }
  },
  methods: {
    getColor() {
      let that = this
      let obj = this.$store.state.items
      Object.keys(obj).forEach(function(key){
        obj[key].find(el => {
          if( el.id == that.$props.item.id ) {
            // if(key == 'done'){
            //   that.bcolor = 'green'
            // }
          }
        })
      })
    }
  }
};
</script>

<style>
.card.task-lane-item {
  background: #627180;
}
</style>
