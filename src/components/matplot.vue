<template>
    <div>
      <input type="file" @change="onFileChange">
      <canvas ref="myChart"></canvas>
      <span class = "CSSofkeyPointsResult" :textContent="this.keyPointsResult"></span>
    </div>
</template>
  
  <script>
import * as XLSX from 'xlsx'
// Import chart.js and register it as a global plugin.
import Chart, { registerables } from "chart.js/auto"
import moment from 'moment'
import 'chartjs-adapter-moment';
window.Chart = Chart;
  
  export default {
    name: 'matplot',
    data() {
      return {
        file: null,
        workbook: null,
        sheetName: '',
        chartlabelnow: '',
        data: [],
        points:[],
        keyPoints:[],
        keyPointsResult:'',
        chart:null,
        chartData: {   
          datasets: [{
          data: [["2023-11-30 18:24",45],["2023-11-30 18:25",46],["2023-11-30 18:26",47]],
          label: 'capacity',
          backgroundColor: '#f87979',
          borderColor: '#f87979',
          pointRadius: 1,
          pointSize: 1
        }]
      },   
      chartOptions: {   
        animate:false,
        // responsive: true, // 开启响应式功能
        // maintainAspectRatio: false, // 关闭图表的比例限制
        scales:{
          xAxes: {
            // type: 'linear', // 设置 x 轴为线性轴
            type: 'time', // 设置 x 轴为线性轴
            // position: 'bottom', // 设置 x 轴位于底部
            // min: data[0][0],
            // max: data[data.length-1][0],
            time: {
                displayFormats: {
                    day: 'MM-DD',
                    minute: 'HH:mm'
                },
                adapters: {
                date: {
                    parse: function(value) {
                        return moment(value).toDate();
                    },
                    format: function(value, context) {
                        return moment(value).format('YYYY-MM-DD HH:mm');
                    },
                    // tooltipFormat: 'lll'
                }
            }
            },
          },
          yAxes: {
            // type: 'linear', // 设置 y 轴为线性轴
            display: true,
            title: {
              display: true,
              text: 'capacity'
            }
          },
        }, 
      }
      };
    },

    mounted() {   
      this.renderChart()   
    },   
    beforeDestroy() {   
      this.destroyChart()   
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
          // 清空一次points数据
          this.points = [];
          this.keyPoints = [];
            for (const row of this.data) {
            // const x = moment(row['time']).format('YYYY-MM-DD HH:mm:ss');
            const x = row['time'];
            const y = row['capacity'];
            this.points.push([x, y]);
            // 获取满电和低电量的值
            if(y == 100 || y<= 5){
              this.keyPoints.push([x, y]);
            }
            };
            // 处理高低电量的点
            for (let i = this.keyPoints.length - 2; i > 0; i--) {  
              let nowValue = this.keyPoints[i][1];
              let lastValue = this.keyPoints[i-1][1];
              let nextValue = this.keyPoints[i+1][1];
              if(nowValue == 100){
                if(lastValue == 100 && nextValue == 100){
                  this.keyPoints.splice(i,1);
                }
              }else if(lastValue == 100){
                if(nowValue >= nextValue){
                  this.keyPoints.splice(i,1)
                }
              }else if(nextValue == 100){
                if(nowValue > lastValue){
                  this.keyPoints.splice(i,1)
                }
              }else if(lastValue != 100 && nextValue != 100){
                this.keyPoints.splice(i,1)
              }
            }  
            // console.log(this.points);
            let keyPointsResult = '';
            this.keyPoints.forEach(element => {
              keyPointsResult += element[0]+":"+element[1]+"\n";
            });
            console.log(keyPointsResult);
            this.keyPointsResult = keyPointsResult;
            this.chartlabelnow = this.points[0][0] + '   -   '+this.points[this.points.length-1][0];
            console.log(this.chartlabelnow);
            this.updateChart();
            };
        reader.readAsBinaryString(file);
      },
      renderChart() {
      // Get the context of the Chart.js canvas element we want to select.
      // const ctx = document.getElementById('myChart').getContext('2d');
      const ctx = this.$refs.myChart.getContext('2d') 
      // Create a new Chart object with the retrieved canvas context.
      this.chart = new Chart(ctx, {
        type:"scatter",
        data:this.chartData,
        options:this.chartOptions,
      });
    },
      /* 更新图表 */   
      updateChart() {   
        if (this.chart) {   
          this.chart.destroy();   
        }   
        this.chartData.datasets[0].data = this.points;
        this.chartData.datasets[0].label = this.chartlabelnow;
        this.renderChart();   
      },   
      /* 销毁图表 */   
      destroyChart() {   
        if (this.chart) {   
          this.chart.destroy()   
          this.chart = null   
        }   
      }   
},
};
  </script>

<style>
.CSSofkeyPointsResult {
  white-space: pre-wrap;
}
</style>