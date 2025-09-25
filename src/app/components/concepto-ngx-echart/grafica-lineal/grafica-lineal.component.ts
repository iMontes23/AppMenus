import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { ECharts } from 'echarts';

@Component({
  selector: 'app-grafica-lineal',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './grafica-lineal.component.html'
})
export class GraficaLinealComponent implements OnInit {

  options:any;
  @ViewChild('chartContainer') chartContainer!: any;
  chart: ECharts | null = null;

  async ngOnInit() {
    this.dataOptiosn();
  }

  ngAfterViewInit(): void {
    if (this.chartContainer) {
      this.chart = echarts.init(this.chartContainer.nativeElement);
      this.chart.setOption(this.options);
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

  dataOptiosn(){
    const xAxisData = [];
    const data1 = [1,8,6,9,3,7,2,8];
    const data2 = [8,2,7,3,9,6,8,1];

    for (let i = 0; i < 8; i++) {
      xAxisData.push('category' + i);
    }

    this.options = {
      tooltip: {
        formatter: this.getTooltipFormatter(),
        confine: true,
      },
      xAxis: {
        data: xAxisData,
      },
      yAxis: {},
      series: [
        {
          type: 'line',
          barCategoryGap: '10%',
          data: data1,
          smooth: true,
          itemStyle: {
            color: '#166f1a', 
          },
          label: {
            show: true,
            position: 'outside',
            color: '#69951e',
          },
          emphasis: {
            itemStyle: {
              color: '#6a34c7',  // Color cuando se pasa el mouse sobre la primera serie
            },
          },
        },
        {
          type: 'line',
          barCategoryGap: '10%',
          data: data2,
          itemStyle: {
            color: '#d6392f', 
          },
          label: {
            show: true,
            position: 'inside',
            color: '#401c8f',
          },
          emphasis: {
            itemStyle: {
              color: '#d6392f',  // Color cuando se pasa el mouse sobre la segunda serie
            },
          },
        },
      ],
    };
  }
}