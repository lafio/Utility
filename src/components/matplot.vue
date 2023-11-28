<template>
    <div>
      <input type="file" @change="onFileChange">
      <canvas id="myChart"></canvas>
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
            // const x = moment(row['time']).format('YYYY-MM-DD HH:mm:ss');
            const x = row['time'];
            const y = row['capacity'];
            this.points.push([x, y]);
            // this.points.push(y);
            // console.log("x:"+x+",y:"+y);
            };
            // console.log(this.points);
            console.log(this.points[0][0],this.points[this.points.length-1][0]);
            this.plotnow()
            };
        reader.readAsBinaryString(file);
      },
      plotnow(){
        if(this.points.length > 0){
          this.renderChart(this.points);
        }else{
          alert("数据为空！")
        }
      },
      renderChart(data) {
    // Get the context of the Chart.js canvas element we want to select.
    const ctx = document.getElementById('myChart').getContext('2d');

    // Create a new Chart object with the retrieved canvas context.
    new Chart(ctx, {
      type:"scatter",
      data:{
        datasets: [{
        data: data,
        label: 'capacity',
        backgroundColor: '#f87979',
        borderColor: '#f87979',
        pointRadius: 1,
        pointSize: 1
      }]
      },
      options: {
        animate:false,
        // responsive: true, // 开启响应式功能
        // maintainAspectRatio: false, // 关闭图表的比例限制
        scales:{
          xAxes: {
            // type: 'linear', // 设置 x 轴为线性轴
            type: 'time', // 设置 x 轴为线性轴
            // position: 'bottom', // 设置 x 轴位于底部
            min: data[0][0],
            max: data[data.length-1][0],
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
      },
    });
  },
},
};
  </script>