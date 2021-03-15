<template>
<v-app>
  <v-card class="text-center" elevation="0">
    <v-card-title class="text-md-h6" style="white-space: nowrap;">2020 已结算病理收入统计</v-card-title>
  </v-card>
  <v-row>
    <v-col cols="24">
      <div id="hot-preview">
        <hot-table :settings="settings" ref="container"></hot-table>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="24">
      <!-- <el-button type="primary" @click="this.load">load</el-button> -->
      <v-btn class="ma-2" small color="primary" @click="this.saveSuccess">保存</v-btn>
      <v-btn class="ma-2" small color="primary" @click="this.handleAvatarSuccess">另存为 CVS</v-btn>
      <v-btn class="ma-2" small color="error" @click="this.handleJsonSuccess">导出数据 EXCEL</v-btn>
    </v-col>
  </v-row>
</v-app>
</template>


<script>
import Handsontable from 'handsontable'
import { HotTable } from '@handsontable/vue'
import 'handsontable/dist/handsontable.full.css'
// import XLSXs from 'xlsx-style'
import XLSX from 'xlsx'
export default {
  components: { HotTable },
  name: 'finance',
  data () {
    return {
      activeIndex: '1',
      dvalue: '',
      settings: {
        ref: 'container',
        data: this.getData(),
        columnSorting: true,
        width: '100%',
        height: 440,
        editor: false,
        minSpareRows: 1,
        stretchH: 'all',
        mergeCells: [
          {row: 0, col: 0, rowspan: 2, colspan: 1}, 
          {row: 0, col: 1, rowspan: 2, colspan: 1}, 
          {row: 0, col: 2, rowspan: 2, colspan: 1},
          {row: 0, col: 3, rowspan: 1, colspan: 3}
        ],
        columns: [
        {},
        {
          type: 'numeric',
          numericFormat: {
            pattern: '0,0.00'
          },
          allowEmpty: false
        },
        {
          type: 'numeric',
          numericFormat: {
            pattern: '0,0.00'
          },
          allowEmpty: false
        },
        {
          type: 'numeric',
          numericFormat: {
            pattern: '0,0.00'
          },
          allowEmpty: false
        },
        {
          type: 'numeric',
          numericFormat: {
            pattern: '0,0.00'
          },
          allowEmpty: false
        },
        {
          type: 'numeric',
          numericFormat: {
            pattern: '0,0.00'
          },
          allowEmpty: false
        }],
        rowHeaders: true,
        fixedRowsTop: 2,
        fixedColumnsLeft: 1,
        nestedRows: true,
        currentRowClassName: 'currentRow',
        currentColClassName: 'currentCol',
        cells: function (row) {
          let cellProperties = {};
          if (row === 0 || row === 1) {
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
              Handsontable.renderers.TextRenderer.apply(this, arguments);
              td.style.fontWeight = 'bolder';
              td.style.color = '#333';
              td.style.background = '#f0f0f0';
              cellProperties.readOnly = true;
            }
          }
          return cellProperties;
        },
        columnSummary: function() {
          var endpoints = [];
          var nestedRowsPlugin = this.hot.getPlugin('nestedRows');
          var getRowIndex = nestedRowsPlugin.dataManager.getRowIndex.bind(nestedRowsPlugin.dataManager);
          var nestedRowsCache = null;
          var tempEndpoint = null;

          if (nestedRowsPlugin.isEnabled()) {
            nestedRowsCache = this.hot.getPlugin('nestedRows').dataManager.cache;
          } else {
            return;
          }

          for (var i = 2; i < nestedRowsCache.levels[0].length-1; i++) {
            for (var s = 1; s < 17; s++) {
              tempEndpoint = {};

              if (!nestedRowsCache.levels[0][i].__children || nestedRowsCache.levels[0][i].__children.length === 0) {
                continue;
              }
              tempEndpoint.destinationColumn = s;
              tempEndpoint.destinationRow = getRowIndex(nestedRowsCache.levels[0][i]);
              tempEndpoint.type = 'sum';
              tempEndpoint.forceNumeric = true;
              tempEndpoint.ranges = [];

              tempEndpoint.ranges.push([
                getRowIndex(nestedRowsCache.levels[0][i].__children[0]),
                getRowIndex(nestedRowsCache.levels[0][i].__children[nestedRowsCache.levels[0][i].__children.length - 1])
              ]);
            

              endpoints.push(tempEndpoint);
              tempEndpoint = null;
            }
          }

          return endpoints;
        },
        licenseKey: 'cb2ae-d10b2-270b3-74b31-59842'
      }
    }
  },
  
  created: function () {
  },
  methods: {
    getData () {
      let arr = [
        ['分子病理汇总与分析','常规',' 免疫组化','分子病理'],
        ['','','', 'PCR', 'FISH', 'HPV'],
      ]
      const fdate = localStorage.getItem('tree2')
      for(let i in JSON.parse(fdate)) {
        arr.push(JSON.parse(fdate)[i])
      }
      return arr
    },
    saveSuccess () {
      const container = this.$refs.container.hotInstance
      let a0 = Array.from(container.getData())
      localStorage.setItem(this.dvalue, JSON.stringify(a0))
    },
    handleAvatarSuccess () {
      const container = this.$refs.container.hotInstance
      const hot = Object.assign(container, {
        data: this.datas, // 导出数据
        colHeaders: true,
        rowHeaders: true
      })
      console.log('s', hot)
      // access to exportFile plugin instance
      const exportPlugin = hot.getPlugin('exportFile')
      console.log('exportPlugin', exportPlugin)
      exportPlugin.downloadFile('csv', {
        rowHeaders: false, // 允许您使用行标题导出数据。
        bom: 'UTF-8', // 允许您使用BOM签名导出数据。
        columnDelimiter: ',', // 允许您定义列分隔符。
        columnHeaders: true, // 允许使用列标题导出数据。
        exportHiddenColumns: true, // 允许您从隐藏列导出数据。
        exportHiddenRows: true, // 允许您从隐藏行导出数据
        fileExtension: 'csv', // 允许您定义文件扩展名。
        filename: '标本送检登记表[YYYY]-[MM]-[DD]', // 允许您定义文件名。
        mimeType: 'text/csv', // 允许您定义MIME类型。
        rowDelimiter: '\r\n' // 允许您定义行分隔符。
      })
      let a0 = Array.from(container.getData())
      this.convert(a0, 'first')
    },
    handleJsonSuccess () {
      const container = this.$refs.container.hotInstance
      let a0 = Array.from(container.getData())
      let a1 = Array.from(container.getColHeader())
      a0.splice(0, 0, a1)
      for (let a in a0) { //处理同行空格
        if (!a0[a].every(item => item === null)) {
          for (let b in a0[a]) {
            if (a0[a][b] == null) {
              a0[a][b] = ''
            }
          }
        } else {
          break
        }
      }
      this.convert(a0, 'first')
    },
    eachStore () {
      const len = localStorage.length
      let arr = {} // 定义数据集
      for (let i = 0; i < len; i++) {
        let getKey = localStorage.key(i)
        if (localStorage.getItem(getKey).substr(0, 1) === '[') {
          let getVal = JSON.parse(localStorage.getItem(getKey))
          arr[getKey] = getVal
        }
      }
      return arr
    },
    convert (data, sheetName) {
      const borderAll = {
        top: {
          style: 'thin'
        },
        bottom: {
          style: 'thin'
        },
        left: {
          style: 'thin'
        },
        right: {
          style: 'thin'
        }
      }
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.aoa_to_sheet(data)
      for (let i in ws) {
        Object.assign(ws[i], { 's': { 'border': borderAll } })
      }
      XLSX.utils.book_append_sheet(wb, ws, sheetName)
      // XLSXs.writeFile(wb, 'write1.xlsx')
    }
  }
}
</script>

<style>
#hot-preview {
  font-size: 12px;
}

.ht_clone_left ,.ht_clone_top ,.ht_clone_bottom , .ht_clone_top_left_corner {
  z-index:auto !important;
}
.container {
  max-width: none !important;
}
#hot-preview {
  text-align: center;
}
.currentRow,.currentCol {
  background-color: #EEC !important;
}
.handsontable td {
  vertical-align: middle;
}
th.ht_nestingParent ~ td {
  color: #333 !important;
  font-weight: bolder;
  position:relative;
  /* background: transparent; */
  /* background-color: #eee !important; */
}
th.ht_nestingParent ~ td::before {
  content: '\00a0';
  display: block;
  float: left;
  white-space : pre;
  object-fit: fill;
  /* box-sizing:border-box; */
  left:0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #aaa !important;
  opacity: .2;
}
.ht_master tr > td:nth-of-type(odd) {
  color: #666;
}

/* Every even column */
.ht_master tr > td:nth-of-type(even) {
  color: #666;
}
.ht_master tr > th:nth-of-type(odd) {
  color: #666;
}

/* Every even column */
.handsontable td:first-of-type {
  color: #666;
}
</style>

