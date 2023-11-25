<template>
    <div>
      <input type="file" @change="onFileChange">
      <canvas id="myChart"></canvas>
    </div>
</template>
  
  <script>
import * as XLSX from 'xlsx'
// Import chart.js and register it as a global plugin.
import Chart from "chart.js/auto";
import moment from 'moment';
window.Chart = Chart;
  
  export default {
    name: 'matplot',
    data() {
      return {
        file: null,
        workbook: null,
        sheetName: '',
        data: [],
        points:[],
      };
    },
    methods: {
      onFileChange(e) {
        const file = e.target.files[0];
        this.file = file;
  
        // Read the Excel file using XLSX library.
        const reader = new FileReader();
        reader.onload = (e) => {
          const binaryString = e.target.result;
          const wb = XLSX.read(binaryString, {type: 'binary'});
          this.sheetName = wb.SheetNames[0];
          this.data = XLSX.utils.sheet_to_json(wb.Sheets[this.sheetName]);

            for (const row of this.data) {
            const x = moment(row['time']);//.format('YYYY-MM-DD HH:mm:ss');
            // const x = row['time'];
            const y = row['capacity'];
            this.points.push({x, y});
            // this.points.push(y);
            // console.log("x:"+x+",y:"+y);
            };
            this.renderChart(this.points);
            };
        reader.readAsBinaryString(file);
      },
      renderChart(data) {
    // Get the context of the Chart.js canvas element we want to select.
    const ctx = document.getElementById('myChart').getContext('2d');

    // Create a new Chart object with the retrieved canvas context.
    new Chart(ctx, {
      type: 'scatter', // 设置类型为散点图
      data: {
        datasets: [{
          label: 'capacity',
          data: data, // 使用前面定义的 points 变量作为数据源
          backgroundColor: '#f87979',
          borderColor: '#f87979',
        }],
      },
      options: {
        scales: {
          x: {
            type: 'linear', // 设置 x 轴为线性轴
            position: 'bottom', // 设置 x 轴位于底部
          },
          y: {
            type: 'linear', // 设置 y 轴为线性轴
          },
        },
      },
    });
  },
},
};
  </script>