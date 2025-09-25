import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { ECharts } from 'echarts';

@Component({
  selector: 'app-grafica-combo',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './grafica-combo.component.html'
})
export class GraficaComboComponent implements OnInit {

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
    const data1 = [];
    const data2 = [];
    const data3 = [];

    for (let i = 0; i < 5; i++) {
      xAxisData.push('categoria' + i);
      data1.push(((Math.sin(i / 5) * (i / 2) + i ) * 5).toFixed(2));
      data2.push(((Math.cos(i / 5) * (i / 5) + i / 6) * 5).toFixed(2));
      data3.push(((Math.cos(i / 5) * (i) + i ) * 9).toFixed(2));
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
          type: 'line',
          barCategoryGap: '10%',
          data: data3,
          itemStyle: {
            color: '#261c8f', 
          },
          label: {
            show: true,
            position: 'outside',
            color: '#e0606b',
          },
        },
      ],
    };
  }
}