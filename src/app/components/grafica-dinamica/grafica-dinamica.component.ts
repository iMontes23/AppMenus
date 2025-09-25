import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { ECharts } from 'echarts';
import { SerieDTO } from '../../models/serie-dto';
import { GraficaDTO } from '../../models/grafica-dto';

@Component({
  selector: 'app-grafica-dinamica',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './grafica-dinamica.component.html'
})
export class GraficaDinamicaComponent implements OnInit {

  @Input() grafica?: GraficaDTO;
  @ViewChild('chartContainer') chartContainer!: any;
  chart: ECharts | null = null;
  options: any;
  detailTable: boolean = false;

  async ngOnInit() {
    this.dataOption();
  }

  ngAfterViewInit(): void {
    if (this.chartContainer) {
      this.chart = echarts.init(this.chartContainer.nativeElement);
      this.chart.setOption(this.options);
    }

    window.addEventListener('resize', () => {
      if (this.chart) {
        this.chart.resize();
      }
    });
  }

  getTooltipFormatter(porcent: any) {
    return (params: any) => {
      let content = '<div style="padding: 3px;">';
      content += `<strong>Categoria: </strong>${params.name}<br>`;
      content += `<strong>Serie: </strong>${params.seriesName}<br>`;
      content += `<strong>Valor: </strong>${params.value}${porcent ? '%' : ''}<br>`;
      if (params.data.visitas != undefined) {
        content += `<strong>Visitas: </strong>${params.data.visitas}<br>`;
      }
      if (params.data.visitaFaltantes != undefined) {
        content += `<strong>Visitas faltantes: </strong>${params.data.visitaFaltantes}<br>`;
      }
      content += '</div>';

      return content;
    };
  }

  dataOption() {
    this.updateTooltipData();
    const tam = this.grafica?.xAxisData?.length || 0;
    this.options = {
      tooltip: {
        formatter: this.getTooltipFormatter(this.grafica?.porcent),
        confine: true,
      },
      xAxis: {
        data: this.grafica?.xAxisData,
        axisLabel: {
          rotate: tam >= 7 ? 45 : 0,
          formatter: (value: string) => {
            // Si el valor es muy largo, lo cortamos y agregamos un salto de línea
            if (value.length > 10 && tam < 7 && tam > 2) {
              return value.split(' ').join('\n');
              // return value.slice(0, 10) + '\n' + value.slice(10); // Corta las etiquetas largas
            }
            return value;  // Si no es largo, no hacer nada
          },
          interval: 0, // Ensures that every label is displayed
          fontSize: 10,
        },
      },
      yAxis: {},
      legend: {
        data: this.grafica?.series,
        show: true,
        orient: 'vertical',//(vertical/horizontal)        
        right: 'right',//(top,bottom)
        top: '40%'
      },
      grid: {
        bottom: tam >= 7 ? '30%' : '20%', // Aumenta el margen inferior para evitar la superposición
      },
      series: [
      ],
    };

    if (this.grafica?.series)
      this.grafica?.series.forEach(s => {
        if (s.type?.toUpperCase() === 'BAR' && s.stack) {
          this.graficaBarraApliada(s, this.grafica?.porcent);
        } else if (s.type?.toUpperCase() === 'LINE') {
          this.graficaLineal(s, this.grafica?.porcent);
        } else {
          this.graficaBarra(s, this.grafica?.porcent);
        }
      });

  }

  tooltipData: any[] = [];

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  formatKey(key: string): string {
    // Divide en espacios donde hay una mayúscula (excepto la primera)
    const spaced = key.replace(/([a-z])([A-Z])/g, '$1 $2');
    // Capitaliza la primera letra
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  }

  updateTooltipData() {
    const categorias = this.grafica?.xAxisData || [];
    const series = this.grafica?.series || [];

    const valorName = this.grafica?.porcent ? '%' : ""

    this.tooltipData = categorias.map((categoria: string, index: number) => {
      // Empieza con el campo 'name'
      const tooltipEntry: any = { categoria: categoria };

      // Recorremos cada serie para agregar sus datos dinámicamente
      series.forEach(serie => {
        // El sufijo se basa en el nombre de la serie sin espacios (puedes adaptar)
        const suffix = serie.name?.replace(/\s+/g, '');
        // Obtenemos el punto de datos para la categoría actual
        const punto = serie.data?.[index] || {};
        // Agregamos las propiedades dinámicamente
        if ('value' in punto && serie.name === "Objetivos") {
          tooltipEntry[`${this.grafica?.porcent ? ' % ' : ''}${suffix}`] = punto.value + (this.grafica?.porcent ? ' %' : '') || 0;
        }else 
        if ('value' in punto && serie.name === "Visitas") {
          tooltipEntry[`${this.grafica?.porcent ? ' % ' : ''}${suffix} Realizadas`] = punto.value + (this.grafica?.porcent ? ' %' : '') || 0;
        }else 
        if ('value' in punto && serie.name === "Clientes") {
          tooltipEntry[`Visitas a ${suffix}`] = punto.value || 0;
        }else 
        if ('value' in punto && serie.name === "Distribuidores") {
          tooltipEntry[`Visitas a ${suffix}`] = punto.value || 0;
        }else 
        if ('value' in punto) {
          tooltipEntry[`${this.grafica?.porcent ? ' % ' : ''}${suffix}`] = punto.value + (this.grafica?.porcent ? ' %' : '') || 0;
        }

        if ('visitas' in punto && serie.name === "Objetivos") {
          tooltipEntry[`${suffix}`] = punto.visitas || 0;
        }else 
        if ('visitas' in punto && serie.name === "Visitas") {
          tooltipEntry[`${suffix} Realizadas`] = punto.visitas || 0;
        }else 
        if ('visitas' in punto) {
          tooltipEntry[`${suffix}`] = punto.visita || 0;
        }
        if ('visitaFaltantes' in punto) {
          tooltipEntry[`${suffix} faltantes`] = punto.visitaFaltantes || '';
        }
        // Si hay más campos que quieras incluir, haz aquí lo mismo
      });

      return tooltipEntry;
    });
    this.detailTable = true;
  }

  private graficaBarra(s: SerieDTO, porcent: any) {
    this.options.series.push({
      name: s.name,
      type: 'bar',
      barCategoryGap: '10%',
      data: s.data,
      itemStyle: this.itemConfig(s),
      label: this.labelConfig(s, porcent),
    });
  }

  private graficaBarraApliada(s: SerieDTO, porcent: any) {
    this.options.series.push({
      name: s.name,
      type: 'bar',
      stack: s.stackName ? s.stackName : 'stack',
      barCategoryGap: '10%',
      data: s.data,
      itemStyle: this.itemConfig(s),
      label: this.labelConfig(s, porcent),
    });
  }

  private graficaLineal(s: SerieDTO, porcent: any) {
    this.options.series.push({
      name: s.name,
      type: 'line',
      barCategoryGap: '10%',
      data: s.data,
      smooth: s.smooth,
      itemStyle: this.itemConfig(s),
      label: this.labelConfig(s, porcent),
      symbol: s.symbol,
      emphasis: {
        itemStyle: {
          color: '#d6392f',
        },
      },
      lineStyle: this.lineStyle(s),
    },);
  }

  private labelConfig(s: SerieDTO, porcent: boolean) {
    return {
      show: s.showLabel,
      position: s.positionLabel,
      color: s.colorLabel,
      formatter: porcent ? '{c}%' : '{c}',
    }
  }

  private itemConfig(s: SerieDTO) {
    return {
      color: s.colorItem,
    }
  }

  private lineStyle(s: SerieDTO) {
    return {
      width: s.width,
      shadowOffsetX: s.shadowOffsetX,
      shadowColor: s.colorItem
    }
  }

}


