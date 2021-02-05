<template>
  <v-app class="overflow-hidden">
    <v-sheet class="fill-height">
      <v-main class="fill-height">
        <v-btn
          @click="
            $refs.chart.add({
              id: +new Date(),
              x: 10,
              y: 10,
              name: 'New',
              type: 'operation',
              approvers: [],
            })
          "
        >
          Add
        </v-btn>
        <v-btn @click="$refs.chart.remove()">Delete</v-btn>
        <v-btn @click="$refs.chart.editCurrent()">
          Edit
        </v-btn>
        <v-btn @click="$refs.chart.save()">Save</v-btn>
      
        <flowchart
          :nodes="nodes"
          :connections="connections"
          @editnode="handleEditNode"
          :width="800"
          :height="500"
          :readonly="false"
          @dblclick="handleDblClick"
          @editconnection="handleEditConnection"
          @save="handleChartSave"
          ref="chart"
          :render="render"
        >
        </flowchart>

        <node-dialog
          :visible.sync="nodeDialogVisible"
          :node.sync="nodeForm.target"
        ></node-dialog>
        <connection-dialog
          :visible.sync="connectionDialogVisible"
          :connection.sync="connectionForm.target"
          :operation="connectionForm.operation"
        >
        </connection-dialog>
      </v-main>
    </v-sheet>
  </v-app>
</template>
<script>
/* eslint-disable no-unused-vars */

import ConnectionDialog from "./components/ConnectionDialog";
import NodeDialog from "./components/NodeDialog";
import Flowchart from "./components/flowchart/Flowchart";
import * as d3 from "d3";
import { roundTo20 } from "./utils/math";

export default {
  components: {
    ConnectionDialog,
    NodeDialog,
    Flowchart,
  },
  data: function () {
    return {
      nodes: [
        { id: 0, x: 50, y: 50, name: "", type: "end" },
        { id: 7, x: 630, y: 50, name: "", type: "all" },
        { id: 1, x: 60, y: 220, name: "Start", type: "start" },
        { id: 2, x: 630, y: 220, name: "End", type: "end" },
        {
          id: 3,
          x: 340,
          y: 130,
          name: "Custom size",
          type: "other",
          approvers: [{ id: 1, name: "Joyce" }],
          width: 120,
          height: 60,
        },
        {
          id: 4,
          x: 220,
          y: 320,
          name: "Operation",
          type: "operation",
          approvers: [{ id: 2, name: "Allen" }],
          width: 120,
        },
        {
          id: 5,
          x: 440,
          y: 220,
          name: "Operation",
          type: "operation",
          approvers: [{ id: 3, name: "Teresa" }],
          width: 120,
        },
      ],
      connections: [
        {
          source: { id: 1, position: "right" },
          destination: { id: 4, position: "left" },
          id: 1,
          name: "",
          type: "pass",
        },
        {
          source: { id: 4, position: "right" },
          destination: { id: 5, position: "left" },
          id: 2,
          name: "",
          type: "pass",
        },
        {
          source: { id: 5, position: "right" },
          destination: { id: 2, position: "left" },
          id: 3,
          name: "asfsdf",
          type: "pass",
        },
        {
          source: { id: 5, position: "bottom2" },
          destination: { id: 4, position: "bottom2" },
          id: 4,
          name: "123124",
          type: "reject",
        },
        {
          source: { id: 1, position: "top2" },
          destination: { id: 3, position: "left" },
          id: 5,
          name: "",
          type: "pass",
        },
        {
          source: { id: 3, position: "right" },
          destination: { id: 2, position: "top2" },
          id: 6,
          name: "",
          type: "pass",
        },
      ],
      nodeForm: { target: null },
      connectionForm: { target: null, operation: null },
      nodeDialogVisible: false,
      connectionDialogVisible: false,
    };
  },
  async mounted() {},
  methods: {
    handleDblClick(position) {
      this.$refs.chart.add({
        id: +new Date(),
        x: position.x,
        y: position.y,
        name: "New",
        type: "operation",
        approvers: [],
      });
    },
    async handleChartSave(nodes, connections) {
      console.log(connections);
      console.log(nodes)
      // axios.post(url, {nodes, connection}).then(resp => {
      //   this.nodes = resp.nodes;
      //   this.connections = resp.connections;
      //   // Flowchart will refresh after this.nodes and this.connections changed
      // });
    },
    handleEditNode(node) {
      this.nodeForm.target = node;
      this.nodeDialogVisible = true;
    },
    handleEditConnection(connection) {
      this.connectionForm.target = connection;
      this.connectionDialogVisible = true;
    },
    render: function (g, node, isSelected) {
      node.width = node.width || 120;
      node.height = node.height || 40;
      // if (node.type == "operation" && node.approvers[0].name) {
      //   node.width = node.approvers[0].name.length * 8 + 8
      // }
      let borderColor = isSelected ? "#666666" : "#bbbbbb";
      // body
      if (node.id === 3 || node.id === 7) {
        let y1 = node.y + node.height / 2
        let x1 = node.x + node.width / 2
        let y2 = node.y + node.height
        let x2 = node.x + node.width
        let ss = node.x +","+ y1 + " " + x1 + "," + node.y + " " + x2 + "," + y1 + " " + x1 + "," + y2;
        let body = g.append("polygon").attr("points", ss);
        body.style("fill", "white");
        body.style("stroke-width", "1px");
        body.classed(node.type, true);
        body.attr("stroke", borderColor);
      } else {
        let body = g.append("rect").attr("class", "body");
        body
          .style("width", node.width + "px")
          .style("fill", "#FFDA5A")
          .style("stroke-width", 0);
        if (node.type !== "start" && node.type !== "end" && node.type !== "all") {
          body.attr("x", node.x).attr("y", node.y).attr("rx", 6);
          body.style("height", roundTo20(node.height) + "px");
        } else {
          body
            .attr("x", node.x)
            .attr("y", node.y)
            .classed(node.type, true)
            .attr("rx", 20);
          body.style("height", roundTo20(node.height) + "px");
        }
        body.attr("stroke", borderColor);
      }

      // body text
      let text =
        node.type === "start"
          ? "Start"
          : node.type === "all"
          ? "All"
          : node.type === "end"
          ? "End"
          : !node.approvers || node.approvers.length === 0
          ? "No approver"
          : node.approvers.length > 1
          ? `${node.approvers[0].name + "..."}`
          : node.approvers[0].name;
      let bodyTextY;
      bodyTextY = node.y + 5 + roundTo20(node.height) / 2;
      g.append("text")
        .attr("x", node.x + node.width / 2)
        .attr("y", bodyTextY)
        .style("fill", "#715809")
        .style("font-weight", "bolder")
        .attr("class", "unselectable")
        .attr("text-anchor", "middle")
        .text(function () {
          return text;
        })
        .each(function wrap() {
          // let self = d3.select(this),
          //   textLength = self.node().getComputedTextLength(),
          //   text = self.text();
          // while (textLength > node.width - 2 * 4 && text.length > 0) {
          //   text = text.slice(0, -1);
          //   self.text(text + "...");
          //   textLength = self.node().getComputedTextLength();
          // }
          if (node.type == "operation" && d3.select(this).node().getComputedTextLength() > 120) node.width = d3.select(this).node().getComputedTextLength() + 10
        });
        
      //   node.width = node.approvers[0].name.length * 8 + 8
      // }
        // if(node.type == "operation" && node.approvers[0].name) console.log(gtext._groups[0][0])
    },
  },
  created :function(){
    const mtm = window.matchMedia('(prefers-color-scheme: dark)')
    const that = this
    if (mtm.matches) {
      that.$vuetify.theme.dark = true
    } else {
      that.$vuetify.theme.dark = false
    }
    mtm.addListener(function(e){
      if (e.matches) {
        that.$vuetify.theme.dark = true
      } else {
        that.$vuetify.theme.dark = false
      }
    })
  
  }
};
</script>
<style scoped>
#toolbar {
  margin-bottom: 10px;
}

.title {
  margin-top: 10px;
  margin-bottom: 0;
}

.subtitle {
  margin-bottom: 10px;
}

#toolbar > button {
  margin-right: 4px;
}

</style>
