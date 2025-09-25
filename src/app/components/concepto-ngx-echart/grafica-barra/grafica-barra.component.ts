import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { ECharts } from 'echarts';

@Component({
  selector: 'app-grafica-barra',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './grafica-barra.component.html',
  styleUrl: './grafica-barra.component.css'
})
export class GraficaBarraComponent implements OnInit {

  options:any;
  @ViewChild('chartContainer') chartContainer!: any;
  chart: ECharts | null = null;

  async ngOnInit() {
    this.dataOptions();
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

  dataOptions(){
    const xAxisData = [];
    const data1 = [];
    const categories = [];
    const colors = ['#ff6995', '#6da6e2', '#ff4500', '#b6da41', '#db7093', '#f7c35b']; 

    for (let i = 0; i < 6; i++) {
      const categoryName = 'Categoria ' + i;
      categories.push(categoryName);
      xAxisData.push(categoryName);
      data1.push({
        value: ((Math.sin(i / 5) * (i / 2) + i ) * 5).toFixed(3),
        name: categoryName, 
        itemStyle: { color: colors[i] }
      });
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
      // legend: {
      //   show: true,
      //   data: categories,
      //   orient: 'vertical',
      //   left: 'left',
      // },
      series: [
        {
          type: 'bar',
          barCategoryGap: '10%',
          data: data1,
          label: {
            show: true,
            position: 'inside',
            color: '#000',
          },
          emphasis: {
            itemStyle: {
              color: '#ffb6c1',  // Cambia el color al pasar el mouse
              borderColor: '#fff',  // Cambia el borde
              borderWidth: 3       // Grosor del borde
            },
            label: {
              show: true,            // Muestra la etiqueta al pasar el mouse
              color: '#000'          // Color del texto
            }
          }
        },
      ],
    };
  }
}
