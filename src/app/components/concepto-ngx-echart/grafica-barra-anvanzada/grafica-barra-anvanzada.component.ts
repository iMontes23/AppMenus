import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { ECharts } from 'echarts';

@Component({
  selector: 'app-grafica-barra-anvanzada',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './grafica-barra-anvanzada.component.html'
})
export class GraficaBarraAnvanzadaComponent  implements OnInit {

  options1:any;
  @ViewChild('chartContainer1') chartContainer1!: any;
  chart: ECharts | null = null;

  options2:any;
  @ViewChild('chartContainer2') chartContainer2!: any;
  chart2: ECharts | null = null;

  async ngOnInit() {
    this.dataOption1();
    this.dataOption2();
  }

  ngAfterViewInit(): void {
    if (this.chartContainer1) {
      this.chart = echarts.init(this.chartContainer1.nativeElement);
      this.chart.setOption(this.options1);
    }

    if (this.chartContainer2) {
      this.chart2 = echarts.init(this.chartContainer2.nativeElement);
      this.chart2.setOption(this.options2);
    }
  }

  getTooltipFormatter() {
    return (params:any) => {
      let content = '<div style="width:150px; height: 60px">';
      content += `<strong>Category: </strong>${params.name}<br>`;
      content += `<strong>Value: </strong>${params.value}<br>`;
      content += `<strong>Series: </strong>${params.seriesName}<br>`;
      content += '</div>';

      return content;
    };
  }

  dataOption1(){
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 5; i++) {
      xAxisData.push('categoria' + i);
      data1.push(((Math.sin(i / 5) * (i / 2) + i ) * 5).toFixed(2));
      data2.push(((Math.cos(i / 5) * (i / 5) + i / 6) * 5).toFixed(2));
    }

    this.options1 = {
      tooltip: {
        formatter: this.getTooltipFormatter(),
        confine: true,
      },
      xAxis: {
        data: xAxisData,
      },
      yAxis: {},
      legend: {
        data: ['Clientes', 'Distribuidores'],
        show: true,
        orient: 'vertical',//(vertical/horizontal)
        bottom: 'bottom',
        itemWidth: 50,
        itemHeight: 30,
        backgroundColor: '#6da6e2',
        textStyle: {
          color: '#333',
          fontSize: 14,
          fontWeight: 'bold'
        },
        borderColor: '#ccc',
        borderWidth: 1,
        padding: [5, 15, 5, 15] 
      },
      series: [
        {
          name: 'Clientes', 
          type: 'bar',
          stack: 'stack1',
          barCategoryGap: '10%',
          data: data1,
          itemStyle: {
            color: '#db544b',
          },
          label: {
            show: true,
            position: 'inside',
            color: '#000',
          },
        },
        {
          name: 'Distribuidores', 
          type: 'bar',
          stack: 'stack1',
          barCategoryGap: '10%',
          data: data2,
          itemStyle: {
            color: '#6a8b41',
          },
          label: {
            show: true,
            position: 'inside',
            color: '#fff',
          },
        }
      ],
    };
  }

  dataOption2(){
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 5; i++) {
      xAxisData.push('categoria' + i);
      data1.push(((Math.sin(i / 5) * (i / 2) + i ) * 5).toFixed(2));
      data2.push(((Math.cos(i / 5) * (i / 5) + i / 6) * 5).toFixed(2));
    }

    this.options2 = {
      tooltip: {
        formatter: this.getTooltipFormatter(),
        confine: true,
      },
      xAxis: {
        data: xAxisData,
      },
      yAxis: {},
      legend: {
        data: ['Clientes', 'Distribuidores', '> = 60%', '< = 49%'],
        show: true,
        orient: 'vertical',//(vertical/horizontal)
        bottom: 'bottom',
        itemWidth: 50,
        itemHeight: 30,
        backgroundColor: '#6da6e2',
        textStyle: {
          color: '#333',
          fontSize: 14,
          fontWeight: 'bold'
        },
        borderColor: '#ccc',
        borderWidth: 1,
        padding: [5, 15, 5, 15] 
      },
      series: [
        {
          name: 'Clientes', 
          type: 'bar',
          barCategoryGap: '10%',
          data: data1,
          itemStyle: {
            color: '#ff7f50',
          },
          label: {
            show: true,
            position: 'inside',
            color: '#000',
          },
        },
        {
          name: 'Distribuidores', 
          type: 'bar',
          barCategoryGap: '10%',
          data: data2,
          label: {
            show: true,
            position: 'inside',
            color: '#fff',
          },
        },
        {
          name: '> = 60%', 
          type: 'line',
          data: new Array(xAxisData.length+1).fill(60),
          itemStyle: {
            color: '#8fce00', 
          },
          tooltip: { 
            show: false,
          },
          symbol: 'none',
          lineStyle: {
            width: 1,
            shadowOffsetX: -100,
            shadowColor: '#8fce00' 
          }
        },
        {
          name:'< = 49%',
          type: 'line',
          data: new Array(xAxisData.length+1).fill(49),
          itemStyle: {
            color: '#fc1d06', 
          },
          tooltip: { 
            show: false,
          },
          symbol: 'none',
          lineStyle: {
            width: 1,
            shadowOffsetX: -100,
            shadowColor: '#fc1d06' 
          }
        }
      ],
    };
  }
}


