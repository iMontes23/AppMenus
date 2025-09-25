import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { ECharts } from 'echarts';

@Component({
  selector: 'app-grafica-circular',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './grafica-circular.component.html'
})
export class GraficaCircularComponent implements OnInit {

  options:any;
  @ViewChild('chartContainer') chartContainer!: any;
  chart: ECharts | null = null;

  options2:any;
  @ViewChild('chartContainer2') chartContainer2!: any;
  chart2: ECharts | null = null;

  async ngOnInit() {
    this.dataOptions();
    this.dataOptions2();
  }

  ngAfterViewInit(): void {
    if (this.chartContainer) {
      this.chart = echarts.init(this.chartContainer.nativeElement);
      this.chart.setOption(this.options);
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

  dataOptions(){
    const data1 = [];
    const categories = [];
    const colors = ['#ff6995', '#6da6e2', '#ff4500', '#b6da41', '#db7093'];

    for (let i = 0; i < 5; i++) {
      const categoryName = 'Categoria ' + i;
      categories.push(categoryName);
      data1.push({
        value: ((Math.sin(i / 5) * (i / 2) + i ) * 5).toFixed(3),
        name: categoryName, 
        itemStyle: { 
          color: colors[i],
          borderColor: colors[i],       // Color del borde
          borderWidth: 1,            // Grosor del borde
          shadowBlur: 10,            // Sombra difusa
          shadowColor: 'rgba(0, 0, 0, 0.5)',  // Color de la sombra
          shadowOffsetX: 5,         // Desplazamiento de la sombra en X
          shadowOffsetY: 5   
        }
      });
    }

    this.options = {
      tooltip: {
        formatter: this.getTooltipFormatter(),
        confine: false,
      },
      legend: {
        show: true,
        data: categories, 
        orient: 'horizontal',//(vertical/horizontal)
        left: 'left',  
      },
      series: [
        {
          type: 'pie',
          radius: '60%', 
          //radius: ['30%', '70%'],
          data: data1,
          itemStyle: {
            color: '#ff7f50',
          },
          labelLine: {//apuntador del segmento
            show: true,              // Muestra las líneas de la etiqueta
            length: 20,              // Longitud de las líneas
            lineStyle: {
              width: 2               // Grosor de las líneas
            }
          },
          label: {
            show: true,
            position: 'outside',  // Coloca las etiquetas fuera del pastel
            formatter: '{b}: ${c}',  // Formato de la etiqueta (nombre: valor)
            color: '#000',        // Color del texto
            fontSize: 14,         // Tamaño de la fuente
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

  dataOptions2(){
    const data1 = [];
    const categories = [];
    const colors = ['#ff6995', '#6da6e2', '#ff4500', '#b6da41', '#db7093'];

    for (let i = 0; i < 5; i++) {
      const categoryName = 'Categoria ' + i;
      categories.push(categoryName);
      data1.push({
        value: ((Math.sin(i / 5) * (i / 2) + i ) * 5).toFixed(3),
        name: categoryName, 
        itemStyle: { 
          color: colors[i] ,
          borderColor: colors[i],       // Color del borde
          borderWidth: 1,            // Grosor del borde
          shadowBlur: 10,            // Sombra difusa
          shadowColor: 'rgba(0, 0, 0, 0.5)',  // Color de la sombra
          shadowOffsetX: 5,         // Desplazamiento de la sombra en X
          shadowOffsetY: 5   
        }
      });
    }

    this.options2 = {
      tooltip: {
        formatter: this.getTooltipFormatter(),
        confine: false,
      },
      legend: {
        show: true,
        data: categories, 
        orient: 'horizontal',//(vertical/horizontal)
        left: 'left',  
      },
      series: [
        {
          type: 'pie',
          radius: ['30%', '70%'],
          data: data1,
          itemStyle: {
            color: '#ff7f50',
          },
          labelLine: {//apuntador del segmento
            show: true,              // Muestra las líneas de la etiqueta
            length: 20,              // Longitud de las líneas
            lineStyle: {
              width: 2               // Grosor de las líneas
            }
          },
          label: {
            show: true,
            position: 'outside',  // Coloca las etiquetas fuera del pastel
            formatter: '{b}: ${c}',  // Formato de la etiqueta (nombre: valor)
            color: '#000',        // Color del texto
            fontSize: 14,         // Tamaño de la fuente
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
