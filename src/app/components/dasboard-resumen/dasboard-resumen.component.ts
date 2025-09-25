import { Component } from '@angular/core';
import { DashboardGenericoGraficaComponent } from '../dashboard-generico-grafica/dashboard-generico-grafica.component';
import { GraficaDTO } from '../../models/grafica-dto';
import { GrupoService } from '../../services/grupo.service';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../../services/securiry.service';
import { CardGraficaDTO } from '../../models/card-grafica-dto';
import { ActividadService } from '../../services/actividad.service';
import { DrmService } from '../../services/drm.service';
import { GrupoDTO } from '../../models/grupo-dto';
import { UserInformation } from '../../utilerias/model/user-information';
import { ActividadDTO } from '../../models/actividad-dto';
import { VisitRegistrationDTO } from '../../models/visit-registration-dto';
import { SerieDTO } from '../../models/serie-dto';
import { UserGroupDTO } from '../../models/user-group-dto';
import { Utilerias } from '../../utilerias/utileria';
import { CurrentAccessService } from '../../services/current-access.service';
import { StrategiesService } from '../../services/strategies.service';
import { StrategiesRequestDTO } from '../../models/strategies-request-dto';
import { StrategiesSummaryDTO } from '../../models/strategies-summary-dto';
import { Constante } from '../../utilerias/constantes/constante';
import { DasGraficaDTO } from '../../models/dash-grafica-dto';

@Component({
  selector: 'app-dasboard-resumen',
  standalone: true,
  imports: [CommonModule, DashboardGenericoGraficaComponent],
  templateUrl: './dasboard-resumen.component.html',
  styleUrl: './dasboard-resumen.component.css'
})
export class DasboardResumenComponent {

  userInformation: UserInformation = new UserInformation();
  grupoUsuarioAutenticado: UserGroupDTO;
  show: boolean = false;

  dasGraficas: DasGraficaDTO[] = [];
  dashPrincipal: DasGraficaDTO = new DasGraficaDTO();
  dashDetalles: DasGraficaDTO = new DasGraficaDTO();
  dashSemanal: DasGraficaDTO = new DasGraficaDTO();

  //Datos consumidos de Base de datos
  grupos: GrupoDTO[] = [];
  gruposUsuarios: UserGroupDTO[] = [];
  usuarios: UserInformation[] = [];
  visitas: VisitRegistrationDTO[] = [];
  estrategia: StrategiesSummaryDTO = new StrategiesSummaryDTO();

  tipoCrad: string = "";

  constructor(
    private grupoService: GrupoService,
    private securityService: SecurityService,
    private actividadService: ActividadService,
    private drmService: DrmService,
    private strategiesService: StrategiesService,
    private utilerias: Utilerias,
    private currentAccessService: CurrentAccessService
  ) {
    this.userInformation = this.currentAccessService.getUserInformation();
    this.grupoUsuarioAutenticado = new UserGroupDTO();
  }

  async ngOnInit() {
    this.cargarGrupos();
    const today = new Date();

    const startDate: Date = this.utilerias.getInicioDeMes(today);
    const endDate: Date = this.utilerias.getFinDeMes(today);

    this.dashPrincipal.titulo = "RESUMEN GENERAL";
    this.dashPrincipal.startDate = startDate;
    this.dashPrincipal.endDate = endDate;

    this.dashDetalles.titulo = "RESUMEN DETALLES";
    this.dashDetalles.startDate = startDate;
    this.dashDetalles.endDate = endDate;

    this.dashSemanal.titulo = "GRAFICA SEMANAL";
    this.dashSemanal.startDate = startDate;
    this.dashSemanal.endDate = endDate;
  }

  cargarGrupos() {
    this.grupoService.getGruposByStatus(true).subscribe(response => {
      this.grupos = response;
      this.cargarGrupoUsuario();
    })
  }

  cargarGrupoUsuario() {
    this.grupoService.getGruposUsuarioByStatus(true).subscribe(response => {
      this.gruposUsuarios = response;
      this.cargarUsuarios();
    })
  }

  cargarUsuarios() {
    this.securityService.getUsersByStatus(true).subscribe(response => {
      this.usuarios = response;
      this.reglasAdicionales();
    })
  }

  reglasAdicionales() {
    const u = this.usuarios.find(a => a.userID.toUpperCase() === this.userInformation.userID.toUpperCase());
    if (u) {
      this.userInformation.cd_area = u.cd_area;
      // if (u.cd_area === 2 || u.cd_area === 3) {
      const gu = this.gruposUsuarios.find(g => g.cd_usuario === u.cd_usuario);
      if (gu) {
        this.grupoUsuarioAutenticado = gu;
        this.dashPrincipal.grupoSeleccionado.cd_grupo = gu.cd_grupo;
        this.dashDetalles.grupoSeleccionado.cd_grupo = gu.cd_grupo;
        this.dashSemanal.grupoSeleccionado.cd_grupo = gu.cd_grupo;
      }

      if (u.cd_area === 3) {
        this.dashPrincipal.grupoSeleccionado.cd_grupo = gu?.cd_grupo;
        this.dashPrincipal.usuarioSeleccionado.cd_usuario = u.cd_usuario;
        this.dashDetalles.usuarioSeleccionado.cd_usuario = u.cd_usuario;
        this.dashSemanal.usuarioSeleccionado.cd_usuario = u.cd_usuario;
      }
      // }
    }
    this.cargarActividades(this.grupoUsuarioAutenticado.cd_grupo, 0);
  }

  cargarActividades(cd_grupo: number, numGrafica: number) {
    this.actividadService.getActividadesSemanales(cd_grupo).subscribe(response => {
      if (numGrafica === 0) {
        this.dashPrincipal.actividades = response;
        this.dashDetalles.actividades = response;
        this.dashSemanal.actividades = response;
      } else if (numGrafica === 1) {
        this.dashPrincipal.actividades = response;
      } else if (numGrafica === 2) {
        this.dashDetalles.actividades = response;
      } else if (numGrafica === 3) {
        this.dashSemanal.actividades = response;
      }
      this.cargarVistas();
    })
  }

  cargarVistas() {
    this.drmService.getAllVisit(this.dashPrincipal.startDate, this.dashPrincipal.endDate).subscribe(response => {
      this.visitas = response;
      this.dasGraficas = [];
      this.consultarEstrategia(this.usuarios, this.dashPrincipal);
    })
  }

  async consultarEstrategia(usuarios: UserInformation[], dash: DasGraficaDTO) {
    let strategiesRequestDTO: StrategiesRequestDTO = new StrategiesRequestDTO();
    let idUsers: number[] = [];
    usuarios.forEach(user => {
      idUsers.push(user.cd_usuario!);
    });

    strategiesRequestDTO.startDate = (dash.startDate.getMonth() + 1) + '/' + dash.startDate.getDate() + '/' + dash.startDate.getFullYear();
    strategiesRequestDTO.endDate = (dash.endDate.getMonth() + 1) + '/' + dash.endDate.getDate() + '/' + dash.endDate.getFullYear();
    strategiesRequestDTO.idUsers = idUsers;

    this.strategiesService.getList(strategiesRequestDTO).subscribe(response => {
      this.estrategia = response;
      this.iniciarGrafica();
    })
  }



  onFechaChange(graficaCurrent: DasGraficaDTO) {
    this.dashPrincipal.startDate = graficaCurrent.startDate;
    this.dashPrincipal.endDate = graficaCurrent.endDate;

    this.dashPrincipal.usuarioSeleccionado.cd_usuario = undefined;
    this.dashDetalles.usuarioSeleccionado.cd_usuario = undefined;
    this.dashSemanal.usuarioSeleccionado.cd_usuario = undefined;
    this.cargarVistas();
  }

  onGroupSelect(dashCurrent: DasGraficaDTO) {
    if (dashCurrent.titulo === "RESUMEN GENERAL") {
      this.dashPrincipal.grupoSeleccionado.cd_grupo =
        dashCurrent.grupoSeleccionado.cd_grupo === 0 ?
          undefined : dashCurrent.grupoSeleccionado.cd_grupo;
      this.dashPrincipal.usuarioSeleccionado.cd_usuario = undefined;
      this.dashPrincipal.graficas = [];
      if (dashCurrent.grupoSeleccionado.cd_grupo && dashCurrent.grupoSeleccionado.cd_grupo > 0) {
        this.cargarActividades(dashCurrent.grupoSeleccionado.cd_grupo, 1);
      } else {
        this.dashPrincipal.actividades = [];
      }

    } else if (dashCurrent.titulo === "RESUMEN DETALLES") {
      this.dashDetalles.grupoSeleccionado.cd_grupo =
        dashCurrent.grupoSeleccionado.cd_grupo === 0 ?
          undefined : dashCurrent.grupoSeleccionado.cd_grupo;
      this.dashDetalles.usuarioSeleccionado.cd_usuario = undefined;
      if (dashCurrent.grupoSeleccionado.cd_grupo && dashCurrent.grupoSeleccionado.cd_grupo > 0) {
        this.cargarActividades(dashCurrent.grupoSeleccionado.cd_grupo, 2);
      } else {
        this.dashDetalles.actividades = [];
      }

    } else if (dashCurrent.titulo === "GRAFICA SEMANAL") {
      this.dashSemanal.grupoSeleccionado.cd_grupo =
        dashCurrent.grupoSeleccionado.cd_grupo === 0 ?
          undefined : dashCurrent.grupoSeleccionado.cd_grupo;
      this.dashSemanal.usuarioSeleccionado.cd_usuario = undefined;

      if (dashCurrent.grupoSeleccionado.cd_grupo && dashCurrent.grupoSeleccionado.cd_grupo > 0) {
        this.cargarActividades(dashCurrent.grupoSeleccionado.cd_grupo, 3);
      } else {
        this.dashSemanal.actividades = [];
      }
    }

    this.iniciarGrafica();
  }

  onUserSelect(dashCurrent: DasGraficaDTO) {
    if (dashCurrent.titulo === "RESUMEN GENERAL") {
      this.dashPrincipal.usuarioSeleccionado.cd_usuario =
        dashCurrent.usuarioSeleccionado.cd_usuario === 0 ?
          undefined : dashCurrent.usuarioSeleccionado.cd_usuario;

      const grupoUser = this.gruposUsuarios.find(g => g.cd_usuario === this.dashPrincipal.usuarioSeleccionado.cd_usuario);
      if (grupoUser) {
        this.dashPrincipal.grupoSeleccionado.cd_grupo = grupoUser.cd_grupo;
      }
    } else if (dashCurrent.titulo === "RESUMEN DETALLES") {
      this.dashDetalles.usuarioSeleccionado.cd_usuario =
        dashCurrent.usuarioSeleccionado.cd_usuario === 0 ?
          undefined : dashCurrent.usuarioSeleccionado.cd_usuario;

      const grupoUser = this.gruposUsuarios.find(g => g.cd_usuario === this.dashDetalles.usuarioSeleccionado.cd_usuario);
      if (grupoUser) {
        this.dashDetalles.grupoSeleccionado.cd_grupo = grupoUser.cd_grupo;
      }
    }
    else if (dashCurrent.titulo === "GRAFICA SEMANAL") {
      this.dashSemanal.usuarioSeleccionado.cd_usuario =
        dashCurrent.usuarioSeleccionado.cd_usuario === 0 ?
          undefined : dashCurrent.usuarioSeleccionado.cd_usuario;

      const grupoUser = this.gruposUsuarios.find(g => g.cd_usuario === this.dashSemanal.usuarioSeleccionado.cd_usuario);
      if (grupoUser) {
        this.dashSemanal.grupoSeleccionado.cd_grupo = grupoUser.cd_grupo;
      }
    }
    this.iniciarGrafica();
  }

  iniciarGrafica() {
    this.dasGraficas = [];
    this.dashPrincipal.graficas = [];
    this.dashDetalles.graficas = [];
    this.dashSemanal.graficas = [];
    this.setGraficaGreneral();
  }

  async setCardsLineaObjetivo(grafica: DasGraficaDTO) {
    let cardDealer: CardGraficaDTO = new CardGraficaDTO(`Línea de objetivo ${grafica.cardTipo ? 'de '+grafica.cardTipo.toLocaleLowerCase() : ''} a distribuidores`, grafica.dealerObjetivo);
    let cardClientes: CardGraficaDTO = new CardGraficaDTO(`Línea de objetivo ${grafica.cardTipo ? 'de '+grafica.cardTipo.toLocaleLowerCase() : ''} a clientes`, grafica.clientObjetivo);
    let cardTotal: CardGraficaDTO = new CardGraficaDTO("Total de usuarios:", grafica.totalUsuario);

    grafica.cards = [];
    grafica.cards.push(cardDealer);
    grafica.cards.push(cardClientes);
    grafica.cards.push(cardTotal);
  }

  filtrarUsuarioPorGrupo(cd_grupo: number): UserInformation[] {
    const gruposUsuario = this.gruposUsuarios.filter(u => u.cd_grupo === cd_grupo);
    const usuario: UserInformation[] = [];
    gruposUsuario.forEach(gu => {
      let u = this.usuarios.find(u => u.cd_usuario === gu.cd_usuario);
      if (u) {
        usuario.push(u)
      }
    });
    return usuario;
  }

  filtarRegistro(graficaCurrent: DasGraficaDTO): VisitRegistrationDTO[] {
    if (graficaCurrent.grupoSeleccionado.cd_grupo !== undefined && graficaCurrent.grupoSeleccionado.cd_grupo > 0 &&
      graficaCurrent.usuarioSeleccionado.cd_usuario !== undefined && graficaCurrent.usuarioSeleccionado.cd_usuario > 0) {
      const visita = this.visitas.filter(v => v.cd_usuario === graficaCurrent.usuarioSeleccionado.cd_usuario);
      graficaCurrent.cardTipo = "USUARIO";
      return visita;
    } else if (graficaCurrent.grupoSeleccionado.cd_grupo !== undefined && graficaCurrent.grupoSeleccionado.cd_grupo > 0) {

      const usuariosDelGrupo = this.gruposUsuarios.filter(u => u.cd_grupo === graficaCurrent.grupoSeleccionado.cd_grupo);
      const visita = this.visitas.filter(v => usuariosDelGrupo.some(u => u.cd_usuario === v.cd_usuario));
      graficaCurrent.cardTipo = "GRUPO";
      return visita;
    } else if (graficaCurrent.usuarioSeleccionado.cd_usuario !== undefined && graficaCurrent.usuarioSeleccionado.cd_usuario > 0) {
      const visita = this.visitas.filter(v => v.cd_usuario === graficaCurrent.usuarioSeleccionado.cd_usuario);
      graficaCurrent.cardTipo = "";
      return visita;
    } else {
      graficaCurrent.cardTipo = "";
      return this.visitas;
    }
  }

  graficaBarra(data: any, nombre: string, color: string, colorLabel: string): SerieDTO {
    let barra: SerieDTO = new SerieDTO();
    barra.type = 'Bar'
    barra.data = data;
    barra.stack = true;
    barra.name = nombre;
    barra.colorLabel = colorLabel;
    barra.colorItem = color;
    return barra;
  }

  graficaLineal(data: any, nombre: string, color: string, colorLabel: string): SerieDTO {
    let barra: SerieDTO = new SerieDTO();
    barra.type = 'line'
    barra.data = data;
    barra.stack = true;
    barra.name = nombre;
    barra.colorLabel = colorLabel;
    barra.colorItem = color;
    return barra;
  }

  async setGraficaGreneral() {
    this.show = false;
    const dataClientes: any = [];
    const dataDealer: any = [];

    const vista: VisitRegistrationDTO[] = this.filtarRegistro(this.dashPrincipal);

    //Datos para eje X
    const xAxisData: any = [];
    let grupoFiltrado: GrupoDTO[] = [];

    if (this.dashPrincipal.grupoSeleccionado.cd_grupo !== undefined
      && this.dashPrincipal.grupoSeleccionado.cd_grupo !== null) {
      const grupo = this.grupos.find(g => g.cd_grupo === this.dashPrincipal.grupoSeleccionado.cd_grupo)
      if (grupo) {
        grupoFiltrado.push(grupo);
      }
    } else {
      grupoFiltrado = this.grupos;
    }

    let sumaDealerObjetivo = 0;
    let sumaClientesObjetivo = 0;
    let sumaDealerObjetivoGrupo: number[] = [];
    let sumaClientesObjetivoGrupo: number[] = [];

    const usuarios: UserInformation[] = [];

    grupoFiltrado.forEach(grupo => {
      const grupousuario = this.gruposUsuarios.filter(us => us.cd_grupo === grupo.cd_grupo);

      let sumaDealer = 0;
      let sumaClientes = 0;
      let sumaDealerObjGrupo = 0;
      let sumaClientesObjGrupo = 0;

      grupousuario.forEach(grupoUser => {
        const usuarioEncontrado = this.usuarios.find(u => u.cd_usuario === grupoUser.cd_usuario);
        const estrategiaEncontrado = this.estrategia.usersSummary.find(u => u.nb_usuario == grupoUser.cd_usuario)

        if (usuarioEncontrado && estrategiaEncontrado) {

          const visitasDealers = vista.filter(v => v.cd_usuario === grupoUser.cd_usuario && v.cd_tipovisita === 1);
          const visitasClientes = vista.filter(v => v.cd_usuario === grupoUser.cd_usuario && v.cd_tipovisita === 2)

          sumaDealer = sumaDealer + visitasDealers?.length || 0;
          sumaClientes = sumaClientes + visitasClientes?.length || 0;

          sumaDealerObjGrupo = sumaDealerObjGrupo + estrategiaEncontrado?.plannedForDistributors || 0;
          sumaClientesObjGrupo = sumaClientesObjGrupo + estrategiaEncontrado?.plannedForClients || 0;

          usuarios.push(usuarioEncontrado);
        }
      });

      xAxisData.push(grupo.nb_grupo);
      dataDealer.push(sumaDealer)
      dataClientes.push(sumaClientes)
      sumaDealerObjetivoGrupo.push(sumaDealerObjGrupo);
      sumaClientesObjetivoGrupo.push(sumaClientesObjGrupo);

      sumaDealerObjetivo = sumaDealerObjetivo + sumaDealerObjGrupo;
      sumaClientesObjetivo = sumaClientesObjetivo + sumaClientesObjGrupo;
    })

    let users: UserInformation[] = []
    if (this.dashPrincipal.usuarioSeleccionado.cd_usuario !== undefined
      && this.dashPrincipal.usuarioSeleccionado.cd_usuario !== null) {
      users = usuarios.filter(u => u.cd_usuario ==
        this.dashPrincipal.usuarioSeleccionado.cd_usuario);

      const estrategiaEncontrado = this.estrategia.usersSummary.find(u => u.nb_usuario == this.dashPrincipal.usuarioSeleccionado.cd_usuario)
      sumaDealerObjetivoGrupo = [];
      sumaClientesObjetivoGrupo = [];

      sumaDealerObjetivo = estrategiaEncontrado?.plannedForDistributors || 0;
      sumaClientesObjetivo = estrategiaEncontrado?.plannedForClients || 0;

      sumaDealerObjetivoGrupo.push(sumaClientesObjetivo);
      sumaClientesObjetivoGrupo.push(sumaClientesObjetivo);
    } else {
      users = usuarios;
    }

    this.dashPrincipal.grupos = this.gerarquiaGrupal(this.grupos);
    this.dashPrincipal.usuarios = this.gerarquiaUsuario(usuarios);

    // VALOR PARA LAS TARJETAS
    this.dashPrincipal.dealerObjetivo = sumaDealerObjetivo;
    this.dashPrincipal.clientObjetivo = sumaClientesObjetivo;
    this.dashPrincipal.totalUsuario = users.length;

    this.setCardsLineaObjetivo(this.dashPrincipal)

    //CALCULAR PORCENTAJE
    let targetClient: any[] = [];
    let targetDealer: any[] = [];

    for (let index = 0; index < xAxisData.length; index++) {

      const diferenciaCliente = sumaClientesObjetivoGrupo[index] - dataClientes[index];
      dataClientes[index] = {
        value: (dataClientes[index] / sumaClientesObjetivoGrupo[index] * 100).toFixed(2),
        name: xAxisData[index],
        visitas: dataClientes[index],
        visitaFaltantes: diferenciaCliente > 0 ? `${diferenciaCliente}` : undefined,
      }

      const diferenciaDealer = sumaDealerObjetivoGrupo[index] - dataDealer[index];
      dataDealer[index] = {
        value: (dataDealer[index] / sumaDealerObjetivoGrupo[index] * 100).toFixed(2),
        name: xAxisData[index],
        visitas: dataDealer[index],
        visitaFaltantes: diferenciaDealer > 0 ? `${diferenciaDealer}` : undefined,
      }

      targetClient.push({
        value: 100,
        name: xAxisData[index],
        visitas: sumaClientesObjetivoGrupo[index],
      })

      targetDealer.push({
        value: 100,
        name: xAxisData[index],
        visitas: sumaDealerObjetivoGrupo[index],
      })
    }

    //GRAFICA DE BARRA VISITA A CLIENTES;
    let graficaClientes = new GraficaDTO();
    graficaClientes.xAxisData = xAxisData;
    graficaClientes.name = "Visita a clientes"
    graficaClientes.series?.push(this.graficaLineal(targetDealer, 'Objetivos', '#bd0505', '#bd0505'));
    graficaClientes.series?.push(this.graficaLineal(dataClientes, 'Visitas', '#e36639', '#e36639'));

    //GRAFICA DE BARRA VISITA A DEALERS;
    let graficaDealer = new GraficaDTO();
    graficaDealer.xAxisData = xAxisData;
    graficaDealer.name = "Visita a Distribuidores"
    graficaDealer.series?.push(this.graficaLineal(targetDealer, 'Objetivos', '#bd0505', '#6C0707'));
    graficaDealer.series?.push(this.graficaLineal(dataDealer, 'Visitas', '#e36639', '#e36639'));

    this.dashPrincipal.graficas.push(graficaDealer);
    this.dashPrincipal.graficas.push(graficaClientes);
    this.dasGraficas.push(this.dashPrincipal);
    this.setGraficaDetalles();
  }

  setGraficaDetalles() {
    this.dashDetalles.startDate = this.dashPrincipal.startDate;
    this.dashDetalles.endDate = this.dashPrincipal.endDate;

    this.dashDetalles.grupos = this.grupos;
    this.dashDetalles.usuarios = this.usuarios;
    this.dashDetalles.cardTipo = "";

    //Datos para eje X
    const xAxisData: any = [];
    const dataClientes: any = [];
    const dataDealer: any = [];

    //Datos para eje X
    let grupoFiltrado: GrupoDTO[] = [];

    if (this.dashDetalles.grupoSeleccionado.cd_grupo !== undefined
      && this.dashDetalles.grupoSeleccionado.cd_grupo !== null) {
      const grupo = this.grupos.find(
        g => g.cd_grupo === this.dashDetalles.grupoSeleccionado.cd_grupo)
      if (grupo) {
        grupoFiltrado.push(grupo);
      }
      this.dashDetalles.cardTipo = "GRUPO";
    } else {
      grupoFiltrado = this.grupos;
    }

    const usuarios: UserInformation[] = []

    grupoFiltrado.forEach(grupo => {
      const grupousuario = this.gruposUsuarios.filter(
        us => us.cd_grupo === grupo.cd_grupo);
      grupousuario.forEach(grupoUser => {
        const usuarioEncontrado = this.usuarios.find(u => u.cd_usuario === grupoUser.cd_usuario);
        if (usuarioEncontrado) {
          usuarios.push(usuarioEncontrado);
        }
      });
    })

    this.dashDetalles.grupos = this.gerarquiaGrupal(this.grupos);
    this.dashDetalles.usuarios = this.gerarquiaUsuario(usuarios);

    let users: UserInformation[] = []
    let sumaDealerObjetivo = 0;
    let sumaClientesObjetivo = 0;

    if (this.dashDetalles.usuarioSeleccionado.cd_usuario !== undefined
      && this.dashDetalles.usuarioSeleccionado.cd_usuario !== null) {
      users = this.usuarios.filter(u => u.cd_usuario ==
        this.dashDetalles.usuarioSeleccionado.cd_usuario);
        this.dashDetalles.cardTipo = "USUARIO";
    } else {
      users = usuarios;
    }

    const sumaDealerObjetivoUsuario: number[] = [];
    const sumaClientesObjetivoUsuario: number[] = [];

    users.forEach(usuario => {
      let dealers = this.visitas?.filter(v => v.cd_usuario === usuario.cd_usuario && v.cd_tipovisita === 1);//clientes
      let clientes = this.visitas?.filter(v => v.cd_usuario === usuario.cd_usuario && v.cd_tipovisita === 2);//dealer

      const estrategiaEncontrado = this.estrategia.usersSummary.find(u => u.nb_usuario === usuario.cd_usuario);
      sumaDealerObjetivo = sumaDealerObjetivo + estrategiaEncontrado?.plannedForDistributors || 0;
      sumaClientesObjetivo = sumaClientesObjetivo + estrategiaEncontrado?.plannedForClients || 0;

      sumaDealerObjetivoUsuario.push(estrategiaEncontrado?.plannedForDistributors || 0);
      sumaClientesObjetivoUsuario.push(estrategiaEncontrado?.plannedForClients || 0);

      xAxisData.push(usuario.userName);
      dataClientes.push(clientes?.length || 0)
      dataDealer.push(dealers?.length || 0)
    });

    this.dashDetalles.totalUsuario = users.length;
    this.dashDetalles.dealerObjetivo = sumaDealerObjetivo;
    this.dashDetalles.clientObjetivo = sumaClientesObjetivo;

    //CALCULAR PORCENTAJE
    let targetClient: any[] = [];
    let targetDealer: any[] = [];
    //CALCULAR PORCENTAJE
    for (let index = 0; index < xAxisData.length; index++) {

      const diferenciaCliente = sumaClientesObjetivoUsuario[index] - dataClientes[index];
      dataClientes[index] = {
        value: (dataClientes[index] / sumaClientesObjetivoUsuario[index] * 100).toFixed(2),
        name: xAxisData[index],
        visitas: dataClientes[index],
        visitaFaltantes: diferenciaCliente > 0 ? `${diferenciaCliente}` : undefined,
      }

      const diferenciaDealer = sumaDealerObjetivoUsuario[index] - dataDealer[index];
      dataDealer[index] = {
        value: (dataDealer[index] / sumaDealerObjetivoUsuario[index] * 100).toFixed(2),
        name: xAxisData[index],
        visitas: dataDealer[index],
        visitaFaltantes: diferenciaDealer > 0 ? `${diferenciaDealer}` : undefined,
      }

      targetClient.push({
        value: 100,
        name: xAxisData[index],
        visitas: sumaClientesObjetivoUsuario[index],
      })

      targetDealer.push({
        value: 100,
        name: xAxisData[index],
        visitas: sumaDealerObjetivoUsuario[index],
      })
    }

    //LINEA DE OBJETIVOS
    let graficaDetallesCliente = new GraficaDTO();
    graficaDetallesCliente.xAxisData = xAxisData;
    graficaDetallesCliente.name = "Visita a clientes"
    graficaDetallesCliente.series?.push(this.graficaLineal(targetClient, 'Objetivos', '#bd0505', '#bd0505'));
    graficaDetallesCliente.series?.push(this.graficaLineal(dataClientes, 'Visitas', '#e36639', '#e36639'));

    //GRAFICA DE BARRA;
    let graficaDetallesDealer = new GraficaDTO();
    graficaDetallesDealer.xAxisData = xAxisData;
    graficaDetallesDealer.name = "Visita a Distribuidores"
    graficaDetallesDealer.series?.push(this.graficaLineal(targetDealer, 'Objetivos', '#bd0505', '#bd0505'));
    graficaDetallesDealer.series?.push(this.graficaLineal(dataDealer, 'Visitas', '#e36639', '#e36639'));

    this.setCardsLineaObjetivo(this.dashDetalles)
    this.dashDetalles.graficas.push(graficaDetallesDealer);
    this.dashDetalles.graficas.push(graficaDetallesCliente);
    this.dasGraficas.push(this.dashDetalles);

    this.setGraficaSemanal();
  }

  setGraficaSemanal() {
    this.dashSemanal.startDate = this.dashPrincipal.startDate;
    this.dashSemanal.endDate = this.dashPrincipal.endDate;
    this.dashDetalles.cardTipo = "";

    //Datos para eje X
    const xAxisData: any = [];
    const dataClientes: any = [];
    const dataDealer: any = [];
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    let grupoFiltrado: GrupoDTO[] = [];

    if (this.dashSemanal.grupoSeleccionado.cd_grupo !== undefined
      && this.dashSemanal.grupoSeleccionado.cd_grupo !== null) {
      const grupo = this.grupos.find(
        g => g.cd_grupo === this.dashSemanal.grupoSeleccionado.cd_grupo)
      if (grupo) {
        grupoFiltrado.push(grupo);
      }
      this.dashDetalles.cardTipo = "GRUPO";
    } else {
      grupoFiltrado = this.grupos;
    }

    const usuarios: UserInformation[] = []

    grupoFiltrado.forEach(grupo => {
      const grupousuario = this.gruposUsuarios.filter(
        us => us.cd_grupo === grupo.cd_grupo);
      grupousuario.forEach(grupoUser => {
        const usuarioEncontrado = this.usuarios.find(u => u.cd_usuario === grupoUser.cd_usuario);
        if (usuarioEncontrado) {
          usuarios.push(usuarioEncontrado);
        }
      });
    })

    let users: UserInformation[] = []
    if (this.dashSemanal.usuarioSeleccionado.cd_usuario !== undefined
      && this.dashSemanal.usuarioSeleccionado.cd_usuario !== null) {
      users = usuarios.filter(u => u.cd_usuario ==
        this.dashSemanal.usuarioSeleccionado.cd_usuario);
        this.dashDetalles.cardTipo = "USUARIO";
    } else {
      users = this.gerarquiaUsuario(usuarios);
    }

    let sumaDealerObjetivo = 0;
    let sumaClientesObjetivo = 0;

    users.forEach(user => {
      const estrategiaEncontrado = this.estrategia.usersSummary.find(u => u.nb_usuario === user.cd_usuario);
      sumaDealerObjetivo = sumaDealerObjetivo + estrategiaEncontrado?.plannedForDistributors || 0;
      sumaClientesObjetivo = sumaClientesObjetivo + estrategiaEncontrado?.plannedForClients || 0;
    });

    daysOfWeek.forEach((day, index) => {
      let clientesVisitados: number = 0;
      let distribuidoresVisitados: number = 0;

      users.forEach(user => {
        const indice = index < 6 ? (index + 1) : 0;
        const listaVisitaClientes = this.visitas.filter(v => {
          const fechaVisita = new Date(v.ts_fechavisita);
          const diaDeLaSemana = fechaVisita.getDay();
          return diaDeLaSemana === indice && v.cd_tipovisita === 2
            && v.cd_usuario === user.cd_usuario;
        });

        const listaVisitaDistribuidores = this.visitas.filter(v => {
          const fechaVisita = new Date(v.ts_fechavisita);
          const diaDeLaSemana = fechaVisita.getDay();
          return diaDeLaSemana === indice && v.cd_tipovisita === 1
            && v.cd_usuario === user.cd_usuario;
        });

        clientesVisitados = clientesVisitados + listaVisitaClientes.length;
        distribuidoresVisitados = distribuidoresVisitados + listaVisitaDistribuidores.length;

      });
      xAxisData.push(day);
      dataClientes.push({
        value: clientesVisitados,
        name: day,
      })
      dataDealer.push({
        value: distribuidoresVisitados,
        name:day,
      })
    });

    this.dashSemanal.dealerObjetivo = sumaDealerObjetivo;
    this.dashSemanal.clientObjetivo = sumaClientesObjetivo;
    this.dashSemanal.totalUsuario = users.length;


    this.dashSemanal.grupos = this.gerarquiaGrupal(this.grupos);
    this.dashSemanal.usuarios = this.gerarquiaUsuario(usuarios);

    let graficaSemanal = new GraficaDTO();
    graficaSemanal.xAxisData = xAxisData;
    graficaSemanal.porcent = false;



    //GRAFICA DE BARRA;
    graficaSemanal.series?.push(this.graficaBarra(dataClientes, 'Clientes', '#118dff', '#fff'));
    graficaSemanal.series?.push(this.graficaBarra(dataDealer, 'Distribuidores', '#0170c0', '#000'));
    this.setCardsLineaObjetivo(this.dashSemanal)
    this.dasGraficas.push(this.dashSemanal);

    this.dashSemanal.graficas.push(graficaSemanal);
    this.show = true;
  }

  gerarquiaGrupal(grupos: GrupoDTO[]) {
    if ((this.userInformation.cd_area === 2 || this.userInformation.cd_area === 3) &&
      this.grupoUsuarioAutenticado.cd_grupo !== undefined &&
      this.grupoUsuarioAutenticado.cd_grupo !== null) {
      return grupos.filter(g => g.cd_grupo === this.grupoUsuarioAutenticado.cd_grupo);
    } else {
      return grupos;
    }
  }

  gerarquiaUsuario(usuarios: UserInformation[]) {
    if (this.userInformation.cd_area === 3 &&
      this.grupoUsuarioAutenticado.cd_grupo !== undefined &&
      this.grupoUsuarioAutenticado.cd_grupo !== null) {
      return usuarios.filter(g => g.cd_usuario === this.grupoUsuarioAutenticado.cd_usuario);
    } else {
      return usuarios;
    }
  }

}
