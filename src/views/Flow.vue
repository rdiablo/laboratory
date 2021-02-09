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

import ConnectionDialog from "../components/ConnectionDialog";
import NodeDialog from "../components/NodeDialog";
import Flowchart from "../components/flowchart/Flowchart";
import * as d3 from "d3";
import { roundTo20 } from "../utils/math";

export default {
  components: {
    ConnectionDialog,
    NodeDialog,
    Flowchart,
  },
  data: function () {
    return {
      nodes: [
        { id: 1, x: 40, y: 220, name: "", type: "start" },
        {
          id: 2,
          x: 180,
          y: 220,
          name: "Operation",
          type: "operation",
          approvers: [{ id: 2, name: "取样" }],
          width: 120,
        },
        {
          id: 3,
          x: 420,
          y: 220,
          name: "Operation",
          type: "operation",
          approvers: [{ id: 3, name: "测序" }],
          width: 120,
        },
        {
          id: 4,
          x: 640,
          y: 220,
          name: "Operation",
          type: "operation",
          approvers: [{ id: 3, name: "报告" }],
          width: 120,
        }
      ],
      connections: [
        {
          source: { id: 1, position: "right" },
          destination: { id: 2, position: "left" },
          id: 1,
          name: "",
          type: "pass",
        },
        {
          source: { id: 2, position: "right" },
          destination: { id: 3, position: "left" },
          id: 2,
          name: "",
          type: "pass",
        },
        {
          source: { id: 3, position: "right" },
          destination: { id: 4, position: "left" },
          id: 3,
          name: "",
          type: "pass",
        }
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
      let color =
        node.type === "start"
          ? "#999999"
          : node.type === 0
          ? ""
          : "#FFDA5A";
      // body

      let body = g.append("rect").attr("class", "body");
      body
        .style("width", node.width + "px")
        .style("fill", color)
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
    

      // body text
      let text =
        node.type === "start"
          ? ""
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
