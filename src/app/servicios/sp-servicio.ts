import { environment } from "src/environments/environment.prod";
import { default as pnp } from 'sp-pnp-js';
import { Injectable } from "@angular/core";
import { from } from 'rxjs';
import { Solicitud } from "../dominio/solicitud";
import { CondicionTecnicaBienes } from "../dominio/condicionTecnicaBienes";
import { CondicionTecnicaServicios } from "../dominio/condicionTecnicaServicios";
import { RecepcionBienes } from "../entrega-bienes/recepcionBienes";
import { RecepcionServicios } from "../entrega-servicios/recepcionServicios";
import { promised } from "q";

@Injectable()
export class SPServicio {
    constructor() { }

    public ObtenerConfiguracion() {
        const configuracionSharepoint = pnp.sp.configure({
            headers: {
                "Accept": "application/json; odata=verbose"
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionConPost() {
        const configuracionSharepoint = pnp.sp.configure({
            headers: {
                "Accept": "application/json; odata=verbose",
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyIsImtpZCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTY5ODQ3Nzg0LCJuYmYiOjE1Njk4NDc3ODQsImV4cCI6MTU2OTg3Njg4NCwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI2NTQ4ZDEyMS1jMDUxLTQ3YTEtYWYyYi1lZmRlYzVmOTllNGNAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiOGY4NjgwNDUtN2VlZS00Mzc0LWEyZjEtMzA3OTIzODcwYWM3Iiwic3ViIjoiOGY4NjgwNDUtN2VlZS00Mzc0LWEyZjEtMzA3OTIzODcwYWM3IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.e2UapxFvjugjXtAbJcnwooirpeYpp5vcVqAuMRfLAGOwuLSIv3HT41fpgc6Qulgadd-h1lWrojhIi36F55fncZYAV6sGqyh4uqlY3O1sQHn7FJrO1cgZbH6Y8sxw3q903ZIfRjUHcW9k4xS_P3KHaVal3DNLoH7wK0KQqAPqjMZWdENvd3yi-Gp2yrCWynkV3JZsDmO39d_KEx2mmjOpX0kdvTFW5Z689yF7HV7lxsi2aQrhWDB6PEN5xIY2vboNWxkz_dF-kDgBConr3Ru4Nilvj8qYT-OISlzkxuQsmRpoliB9VJIiiaiUd3h5i0xRaDkydoxyqpiWqTaOFAfW1w'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    ObtenerUsuarioActual() {
        let respuesta = from(this.ObtenerConfiguracion().web.currentUser.get());
        return respuesta;
    }

    ObtenerTodosLosUsuarios() {
        let respuesta = from(this.ObtenerConfiguracion().web.siteUsers.get());
        return respuesta;
    }

    ObtenerUsuarioPorEmail(email : string){
        let respuesta = from(this.ObtenerConfiguracion().web.siteUsers.getByEmail(email).get());
        return respuesta;
    }

    ObtenerTiposSolicitud() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaTiposSolicitud).items.getAll());
        return respuesta;
    }

    ObtenerEmpresas() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpresas).items.getAll());
        return respuesta;
    }
    

    ObtenerPaises() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaPaises).items.getAll());
        return respuesta;
    }

    ObtenerCategorias() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCategorias).items.getAll());
        return respuesta;
    }

    ObtenerSubcategorias(idCategoria: number, idPais: number) {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSubcategorias).items.select("ID", "Title", "Categoria/Title", "Categoria/ID", "Comprador/Title", "Comprador/ID", "Pais/Title", "Pais/ID", "CondicionesTecnicas/Title", "CondicionesTecnicas/ID", "CodigoAriba").expand("Categoria", "Comprador", "CondicionesTecnicas", "Pais").filter("CategoriaId eq " + idCategoria + "and PaisId eq " + idPais).get());
        return respuesta;
    }

    obtenerMisSolicitudes(usuarioId: number) {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.select("ID", "Title", "TipoSolicitud", "Solicitante", "Empresa/Title", "OrdenadorGastos/ID", "OrdenadorGastos/Title", "Pais/ID", "Pais/Title", "Empresa/Title", "Empresa/ID", "Comprador/Title", "Comprador/ID", "Categoria", "Subcategoria", "CM", "CondicionesContractuales", "Alcance", "Justificacion", "FechaDeseadaEntrega", "Estado", "Author/Title", "Author/ID", "Responsable/ID", "Responsable/Title", "Created", "CodigoAriba", "Consecutivo", "FueSondeo").expand("Empresa", "Pais", "OrdenadorGastos", "Responsable", "Comprador", "Author").filter("AuthorId eq " + usuarioId + " and Estado ne 'Inicial'").orderBy('Consecutivo', true).top(4999).get());
        return respuesta;
    }

    obtenerSolicitudes() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.select("ID", "Title", "TipoSolicitud", "Solicitante", "Empresa/Title", "OrdenadorGastos/Title", "Pais/ID", "Pais/Title", "Empresa/Title", "Empresa/ID", "Comprador/Title", "Comprador/ID", "Categoria", "Subcategoria", "CM", "CondicionesContractuales", "Alcance", "Justificacion", "FechaDeseadaEntrega", "Estado", "Author/Title", "Author/ID", "Responsable/Title", "Created", "CodigoAriba", "Consecutivo", "FueSondeo").expand("Empresa", "Pais", "OrdenadorGastos", "Responsable", "Comprador", "Author").orderBy('Consecutivo', true).getAll());
        return respuesta;
    }

    agregarSolicitud(solicitud: Solicitud) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.add({
            Title: solicitud.titulo,
            TipoSolicitud: solicitud.tipoSolicitud,
            CM: solicitud.cm,
            Solicitante: solicitud.solicitante,
            EmpresaId: solicitud.empresa,
            OrdenadorGastosId: solicitud.ordenadorGastos,
            PaisId: solicitud.pais,
            Categoria: solicitud.categoria,
            Subcategoria: solicitud.subcategoria,
            CompradorId: solicitud.comprador,
            FechaDeseadaEntrega: solicitud.fechaEntregaDeseada,
            Alcance: solicitud.alcance,
            Justificacion: solicitud.justificacion,
            CondicionesContractuales: solicitud.condicionesContractuales,
            ResponsableId: solicitud.responsable,
            Estado: solicitud.estado,
            AuthorId: solicitud.autor,
            CompraBienes: solicitud.compraBienes,
            CompraServicios: solicitud.compraServicios,
            FaltaRecepcionBienes: solicitud.compraBienes,
            FueSondeo: solicitud.FueSondeo,
            FaltaRecepcionServicios: solicitud.compraServicios,
            CodigoAriba: solicitud.codigoAriba,
            OrdenEstadistica: solicitud.compraOrdenEstadistica,
            NumeroOrdenEstadistica: solicitud.numeroOrdenEstadistica,
        });
    }

    borrarSolicitud(Idsolicitud: number){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(Idsolicitud).delete();
    }

    actualizarSolicitud(idSolicitud: number, solicitud: Solicitud){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(idSolicitud).update({
            Title: solicitud.titulo,
            TipoSolicitud: solicitud.tipoSolicitud,
            CM: solicitud.cm,
            Solicitante: solicitud.solicitante,
            EmpresaId: solicitud.empresa,
            OrdenadorGastosId: solicitud.ordenadorGastos,
            PaisId: solicitud.pais,
            Categoria: solicitud.categoria,
            Subcategoria: solicitud.subcategoria,
            CompradorId: solicitud.comprador,
            FechaDeseadaEntrega: solicitud.fechaEntregaDeseada,
            Alcance: solicitud.alcance,
            Justificacion: solicitud.justificacion,
            CondicionesContractuales: solicitud.condicionesContractuales,
            ResponsableId: solicitud.responsable,
            CompraBienes: solicitud.compraBienes,
            CompraServicios: solicitud.compraServicios,
            FaltaRecepcionBienes: solicitud.compraBienes,
            FaltaRecepcionServicios: solicitud.compraServicios,
            FueSondeo: solicitud.FueSondeo,
            Consecutivo: solicitud.consecutivo,
            Estado: solicitud.estado,
            CodigoAriba: solicitud.codigoAriba,
            OrdenEstadistica: solicitud.compraOrdenEstadistica,
            NumeroOrdenEstadistica: solicitud.numeroOrdenEstadistica,
            FechaDeCreacion: solicitud.fechaCreacion
        });
    }

    agregarCondicionesTecnicasBienesExcel(condicionTecnicaBienes) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.add(condicionTecnicaBienes);
    }

    agregarCondicionesTecnicasBienes(condicionTecnicaBienes: CondicionTecnicaBienes) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.add({
            Title: condicionTecnicaBienes.titulo,
            SolicitudId: condicionTecnicaBienes.idSolicitud,
            Codigo: condicionTecnicaBienes.codigo,
            CodigoSondeo: condicionTecnicaBienes.codigo,
            Descripcion: condicionTecnicaBienes.descripcion,
            Modelo: condicionTecnicaBienes.modelo,
            Fabricante: condicionTecnicaBienes.fabricante,
            Cantidad: condicionTecnicaBienes.cantidad,
            CantidadSondeo: condicionTecnicaBienes.cantidad,
            ValorEstimado: condicionTecnicaBienes.valorEstimado,
            PrecioSondeo: condicionTecnicaBienes.valorEstimado,
            Comentarios: condicionTecnicaBienes.comentarios,
            TipoMoneda: condicionTecnicaBienes.tipoMoneda,
            MonedaSondeo: condicionTecnicaBienes.tipoMoneda,
            costoInversion: condicionTecnicaBienes.costoInversion,
            numeroCostoInversion: condicionTecnicaBienes.numeroCostoInversion,
            numeroCuenta: condicionTecnicaBienes.numeroCuenta
        });
    }
    
    actualizarCondicionesTecnicasBienes(idCondicionTecnicaBienes: number, condicionTecnicaBienes: CondicionTecnicaBienes){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(idCondicionTecnicaBienes).update({
            Title: condicionTecnicaBienes.titulo,
            SolicitudId: condicionTecnicaBienes.idSolicitud,
            Codigo: condicionTecnicaBienes.codigo,
            CodigoSondeo: condicionTecnicaBienes.codigo,
            Descripcion: condicionTecnicaBienes.descripcion,
            Modelo: condicionTecnicaBienes.modelo,
            Fabricante: condicionTecnicaBienes.fabricante,
            Cantidad: condicionTecnicaBienes.cantidad,
            CantidadSondeo: condicionTecnicaBienes.cantidad,
            ValorEstimado: condicionTecnicaBienes.valorEstimado,
            PrecioSondeo: condicionTecnicaBienes.valorEstimado,
            Comentarios: condicionTecnicaBienes.comentarios,
            TipoMoneda: condicionTecnicaBienes.tipoMoneda,
            MonedaSondeo: condicionTecnicaBienes.tipoMoneda,
            costoInversion: condicionTecnicaBienes.costoInversion,
            numeroCostoInversion: condicionTecnicaBienes.numeroCostoInversion,
            numeroCuenta: condicionTecnicaBienes.numeroCuenta
        });
    }

    actualizarCondicionesTecnicasBienesEntregaBienes(IdBienes,objActualizacionCTB){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(IdBienes).update(
            objActualizacionCTB
        );
    }

    borrarCondicionTecnicaBienes(idCondicionTecnicaBienes: number){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(idCondicionTecnicaBienes).delete();
    }

    agregarAdjuntoCondicionesTecnicasBienes(idCondicion: number, nombreArchivo: string, archivo: File) {
        let item = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(idCondicion);
        return item.attachmentFiles.add(nombreArchivo, archivo);
    }

    agregarAdjuntoActivos(IdSolicitud: number, nombreArchivo: string, archivo: File) {
        let item = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud);
        return item.attachmentFiles.add(nombreArchivo, archivo);
    }

    agregarAdjuntoContratos(IdContrato: number, nombreArchivo: string, archivo: File) {
        let item = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaContratos).items.getById(IdContrato);
        return item.attachmentFiles.add(nombreArchivo, archivo);
    }

    agregarAdjuntoActivosBienes(IdSolicitud: number, nombreArchivo: string, archivo: File) {
        let item = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionBienes).items.getById(IdSolicitud);
        return item.attachmentFiles.add(nombreArchivo, archivo);
    }

    agregarAdjuntoActivosServicios(IdSolicitud: number, nombreArchivo: string, archivo: File) {
        let item = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionServicios).items.getById(IdSolicitud);
        return item.attachmentFiles.add(nombreArchivo, archivo);
    }

    borrarAdjuntoCondicionesTecnicasBienes(idCondicion: number, nombreArchivo: string){
        let item = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(idCondicion);
        return item.attachmentFiles.getByName(nombreArchivo).delete();
    }

    borrarAdjuntoCondicionesTecnicasServicios(idCondicion: number, nombreArchivo: string){
        let item = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idCondicion);
        return item.attachmentFiles.getByName(nombreArchivo).delete();
    }

    agregarCondicionesTecnicasServicios(condicionTecnicaServicios: CondicionTecnicaServicios) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.add({
            Title: condicionTecnicaServicios.titulo,
            SolicitudId: condicionTecnicaServicios.idSolicitud,
            Codigo: condicionTecnicaServicios.codigo,
            CodigoSondeo: condicionTecnicaServicios.codigo,
            Descripcion: condicionTecnicaServicios.descripcion,
            Cantidad: condicionTecnicaServicios.cantidad,
            CantidadSondeo: condicionTecnicaServicios.cantidad,
            ValorEstimado: condicionTecnicaServicios.valorEstimado,
            PrecioSondeo: condicionTecnicaServicios.valorEstimado,
            TipoMoneda: condicionTecnicaServicios.tipoMoneda,
            MonedaSondeo: condicionTecnicaServicios.tipoMoneda,
            Comentario: condicionTecnicaServicios.comentarios,
            costoInversion: condicionTecnicaServicios.costoInversion,
            numeroCostoInversion: condicionTecnicaServicios.numeroCostoInversion,
            numeroCuenta: condicionTecnicaServicios.numeroCuenta
        });
    }

    agregarCondicionesTecnicasServiciosExcel(condicionTecnicaServicios) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.add(condicionTecnicaServicios);
    }

    actualizarCondicionesTecnicasServicios(idCondicionTecnicaServicios: number, condicionTecnicaServicios: CondicionTecnicaServicios){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idCondicionTecnicaServicios).update({
            Title: condicionTecnicaServicios.titulo,
            SolicitudId: condicionTecnicaServicios.idSolicitud,
            Codigo: condicionTecnicaServicios.codigo,
            CodigoSondeo: condicionTecnicaServicios.codigo,
            Descripcion: condicionTecnicaServicios.descripcion,
            Cantidad: condicionTecnicaServicios.cantidad,
            CantidadSondeo: condicionTecnicaServicios.cantidad,
            ValorEstimado: condicionTecnicaServicios.valorEstimado,
            PrecioSondeo: condicionTecnicaServicios.valorEstimado,
            TipoMoneda: condicionTecnicaServicios.tipoMoneda,
            MonedaSondeo: condicionTecnicaServicios.tipoMoneda,
            Comentario: condicionTecnicaServicios.comentarios,
            costoInversion: condicionTecnicaServicios.costoInversion,
            numeroCostoInversion: condicionTecnicaServicios.numeroCostoInversion,
            numeroCuenta: condicionTecnicaServicios.numeroCuenta
        });
    }

    borrarCondicionTecnicaServicios(idCondicionTecnicaServicios: number){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idCondicionTecnicaServicios).delete();
    }

    agregarAdjuntoCondicionesTecnicasServicios(idSolicitud: number, nombreArchivo: string, archivo: File) {
        let item = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idSolicitud);
        return item.attachmentFiles.add(nombreArchivo, archivo);
    }

    borraAdjuntoCondicionesTecnicasServicios(idCondicion: number, nombreArchivo: string){
        let item = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idCondicion);
        return item.attachmentFiles.getByName(nombreArchivo).delete();
    }

    obtenerParametrosConfiguracion(){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaConfiguracion).items.filter("Title eq 'Configuración'").get());
        return respuesta;
    }

    obtenerdatosProfile(){
        let respuesta = from(this.ObtenerConfiguracion().profiles.myProperties.get());
        return respuesta;
    }

    ObtenerSolicitudBienesServicios(IdSolicitud){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).select("Id","TipoSolicitud","CM","FechaDeseadaEntrega","FechaRegistrarSolpsap","Solicitante","Responsable/Title","OrdenadorGastos/Title","OrdenadorGastos/Department","Empresa/Title","Pais/Title","Pais/Id","Categoria","Subcategoria","Comprador/Title", "Comprador/ID", "Alcance","Justificacion","CondicionesContractuales","AuthorId","Author/Title","ComentarioSondeo", "ResultadoSondeo","ComentarioRevisionSondeo","ComentarioVerificarMaterial","EstadoRegistrarSAP","ComentarioRegistrarSAP","NumSolSAP","CodigoAriba","CompraBienes","CompraServicios","OrdenEstadistica","NumeroOrdenEstadistica","AttachmentFiles","Attachments","FaltaRecepcionServicios","FaltaRecepcionBienes", "ComentarioRegistroActivos", "FueSondeo", "FechaDeCreacion","Consecutivo").expand("OrdenadorGastos","Responsable","Comprador","Empresa","Pais","Author","AttachmentFiles").get());
        return respuesta;
    }

    ObtenerReporteSolicitud(fechaInico, fechaFin){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.select("Consecutivo","TipoSolicitud","Estado","NumSolSAP","CM","OrdenadorGastos/Title","NumeroDeContrato","Solicitante","Author/Department","OrdenadorGastos/ID","Comprador/Title","Comprador/ID","Categoria","Subcategoria","Alcance","Pais/Title","Pais/ID","FueSondeo","FechaDeCreacion","FechaSondeo","FechaRevisarSondeo","FechaVerificarMaterial", "FechaRegistrarActivo", "FechaSuspension", "FechaReactivacion", "FechaRegistrarSolpsap","FechaRegistrarContrato","FechaEnvioProveedor","MotivoDeSuspension","Responsable/ID", "Responsable/Title", "ResponsableReasignarSondeo", "FechaReasignadoSondeo", "ResponsableReasignarContratos", "FechaReasignadoContratos").expand("OrdenadorGastos","Responsable","Comprador","Pais", "Author").filter("FechaDeCreacion ge datetime'"+fechaInico+"T00:00:00.00Z' and FechaDeCreacion le datetime'"+fechaFin+"T23:59:59.00Z'").top(4999).get());
        return respuesta;
    }

    ObtenerReporteContratos(fechaInico, fechaFin){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaContratos).items.select("*","Solicitud/Consecutivo").filter("Created ge datetime'"+fechaInico+"T00:00:00.00Z' and Created le datetime'"+fechaFin+"T23:59:59.00Z'").expand("Solicitud").top(4999).get());
        return respuesta;
    }

    ObtenerCondicionesTecnicasBienes(IdSolicitud){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.filter("SolicitudId eq " + IdSolicitud).select("*","Solicitud/ID","AttachmentFiles").expand("Solicitud","AttachmentFiles").get());
        return respuesta;
    } 
    
    ObtenerCondicionesTecnicasBienesExcel(IdSolicitud){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.filter("SolicitudId eq " + IdSolicitud).select("*","Solicitud/ID","AttachmentFiles").expand("Solicitud","AttachmentFiles").orderBy("Orden").get());
        return respuesta;
    } 

    ObtenerRecepcionesBienes(IdResponsable : number){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionBienes).items.filter("recibidoSap eq '0' and Cantidad ne '0' and Estado eq 'Confirmado' and ResponsableSAPId eq '"+IdResponsable+"'").select("*","AttachmentFiles", "Author/Title").expand("AttachmentFiles", "Author").get());
        return respuesta;
    }

    ObtenerRecepcionesBienesEntregaBienes(IdSolicitud){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionBienes).items.filter("IdSolicitud eq '"+IdSolicitud+"' and recibidoSap eq '0'").select("*","AttachmentFiles").expand("AttachmentFiles").orderBy("Id",false).get());
        return respuesta;
    }

    GuardarBienesRecibidos(ObjRecepcionBienes: RecepcionBienes,IdSolicitud,Responsable,NumeroPedido){
        let RecepcionBienesObj = {
            IdSolicitudId: IdSolicitud,
            IdCTBienesId: ObjRecepcionBienes.Idbienes,
            Descripcion: ObjRecepcionBienes.descripcion,
            Cantidad: ObjRecepcionBienes.cantidad,
            Valor: ObjRecepcionBienes.valor,
            UltimaEntrega: ObjRecepcionBienes.ultimaEntrega,
            Comentario: ObjRecepcionBienes.comentario,
            FechaRecepcion: new Date(),
            ResponsableSAPId: Responsable,
            NumeroPedido: NumeroPedido
        };
        let elemento = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionBienes).items.add(RecepcionBienesObj);
        return elemento;
    }

    actualizarBienesRecibidos(IdBienes){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionBienes).items.getById(IdBienes).update({
            UltimaEntrega: true
        });
    }

    eliminarBienesRecibidos(idBienes){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionBienes).items.getById(idBienes).delete();
    }

    ConfirmarEntregaBienes(IdBienes){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionBienes).items.getById(IdBienes).update({
            Estado: "Confirmado"
        }); 
    }

    cambioEstadoRecepcionBienesServicios(IdSolicitud, objeto){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(
            objeto
        );
    } 

    actualizarFechaContratos(IdSolicitud, ContratoOC){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(
              {
                FechaRegistrarContrato: new Date(),
                NumeroDeContrato: ContratoOC
            }
        );
    } 
    
    ObtenerCondicionesTecnicasServicios(IdSolicitud){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.filter("SolicitudId eq " + IdSolicitud).select("*","AttachmentFiles").expand("AttachmentFiles").get());
        return respuesta;
    }

    ObtenerCondicionesTecnicasServiciosExcel(IdSolicitud){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.filter("SolicitudId eq " + IdSolicitud).select("*","AttachmentFiles").expand("AttachmentFiles").orderBy("Orden").get());
        return respuesta;
    }

    ObtenerRecepcionesServicios(IdResponsable:number){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionServicios).items.filter("recibidoSap eq '0' and Cantidad ne '0' and Estado eq 'Confirmado' and ResponsableSAPId eq '"+IdResponsable+"'").select("*","AttachmentFiles","Author/Title").expand("AttachmentFiles", "Author").get());
        return respuesta;
    }

    ObtenerRecepcionesServicioEntregaServicio(IdSolicitud){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionServicios).items.filter("IdSolicitud eq '"+IdSolicitud+"' and recibidoSap eq '0'").select("*","AttachmentFiles").expand("AttachmentFiles").orderBy("Id",false).get());
        return respuesta;
    }

    GuardarServiciosRecibidos(ObjRecepcionServicios: RecepcionServicios,IdSolicitud,Responsable, NumeroPedido){
        let RecepcionBienesObj = {
            IdSolicitudId: IdSolicitud,
            IdCTServiciosId: ObjRecepcionServicios.idServicio,
            Descripcion: ObjRecepcionServicios.descripcion,
            Cantidad: ObjRecepcionServicios.cantidad,
            Valor: ObjRecepcionServicios.valor,
            UltimaEntrega: ObjRecepcionServicios.ultimaEntrega,
            Comentario: ObjRecepcionServicios.comentario,
            FechaRecepcion: new Date(),
            Estado: ObjRecepcionServicios.estadoRS,
            Ubicacion: ObjRecepcionServicios.ubicacion,
            Mes: ObjRecepcionServicios.mes,
            Ano: ObjRecepcionServicios.ano,
            ResponsableSAPId: Responsable,
            NumeroPedido: NumeroPedido
        };
        let elemento = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionServicios).items.add(RecepcionBienesObj);
        return elemento;
    }

    actualizarCondicionesTecnicasServiciosEntregaServicios(IdServicio,objActualizacionCTS){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(IdServicio).update(
            objActualizacionCTS
        );
    }

    actualizarServiciosRecibidos(IdServicios){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionServicios).items.getById(IdServicios).update({
            UltimaEntrega: true
        });
    }

    eliminarServiciosRecibidos(idServicios){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionServicios).items.getById(idServicios).delete();
    }

    ConfirmarEntregaServicios(IdServicios){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionServicios).items.getById(IdServicios).update({
            Estado: "Confirmado"
        }); 
    }

    GuardarContrato(ObjContrato){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaContratos).items.add(ObjContrato);
    }

    cambioEstadoSolicitud(IdSolicitud, nombreEstado, autor){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(
            {
                Estado: nombreEstado,
                ResponsableId: autor
            }
        );
    }
    
    ObtenerMisPendientes(usuarioId){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.select("ID", "Title", "TipoSolicitud", "Solicitante", "Empresa/Title", "OrdenadorGastos/Title", "OrdenadorGastos/ID", "Pais/ID", "Pais/Title", "Empresa/Title", "Empresa/ID", "Comprador/Title", "Comprador/ID", "Categoria", "Subcategoria", "CM", "CondicionesContractuales", "Alcance", "Justificacion", "FechaDeseadaEntrega", "Estado", "Author/Title", "Author/ID", "Created","Responsable/Title", "Responsable/ID", "CompraBienes", "CompraServicios", "CodigoAriba", "Consecutivo", "OrdenEstadistica", "NumeroOrdenEstadistica","FaltaRecepcionServicios","FaltaRecepcionBienes", "FueSondeo", "Suspendida", "Reactivada").expand("Empresa", "Pais", "OrdenadorGastos", "Comprador", "Responsable", "Author").filter("Responsable eq '"+usuarioId+"' and Estado ne 'Finalizado' and Estado ne 'Rechazado' and Estado ne 'Descartado' and Estado ne 'Inicial' and Estado ne 'Recibido'").orderBy('Consecutivo', true).top(4999).get());
        return respuesta;
    }

    guardarComentario(IdSolicitud, coment){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(coment);
        return respuesta;
    }

    obtenerResponsableProcesos(IdPais){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaResponsableProceso).items.filter("PaisId eq '"+IdPais+"'").getAll());  
        return respuesta;
    }

    guardarVerificarMaterial(IdSolicitud, objGuardarVerificar){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(IdSolicitud).update(objGuardarVerificar);
        return respuesta;
    }

    ObtenerContratos(IdSolicitud: number){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaContratos).items.filter("SolicitudId eq " + IdSolicitud).getAll());
        return respuesta;
    }

    guardarSondeoBienes(idCondicion, objSondeo){   
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(idCondicion).update(objSondeo);        
        return respuesta;
    }

    guardarSondeoServicios(idCondicion, objSondeo){   
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idCondicion).update(objSondeo);        
        return respuesta;
    }

    guardarRegSondeo(IdSolicitud, ObjSolpSap){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(ObjSolpSap);
        return respuesta;
    }

    descartarSolicitud(IdSolicitud, ObjCont){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(ObjCont);
        return respuesta;
    }

    suspenderSolicitud(IdSolicitud, objSusp){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(objSusp);
        return respuesta;
    }

    reactivarSolicitud(IdSolicitud, objReac){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(objReac);
        return respuesta;
    }

    guardarSOLPSAP(IdSolicitud, ObjSolpSap){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(ObjSolpSap);
        return respuesta;
    }

    registrarRecepcionBienes(IdRecepcion, objRegistrar){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionBienes).items.getById(IdRecepcion).update(objRegistrar);
        return respuesta;
    }

    registrarRecepcionServicios(IdRecepcion, objRegistrar){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionServicios).items.getById(IdRecepcion).update(objRegistrar);
        return respuesta;
    }

    actualizarConsecutivo(consecutivoNuevo: number){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaConfiguracion).items.getById(1).update(
            {
                ConsecutivoSolicitudes: consecutivoNuevo
            }
        );
    }

    agregarNotificacion(objNotificacion){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaNotificaciones).items.add(objNotificacion);
    }

    ObtenerGruposUsuario(usuarioId: number){
        let respuesta = from(this.ObtenerConfiguracion().web.getUserById(usuarioId).groups.get());
        return respuesta;
    }

    actualizarResponsableCompradorSolicitud(idSolicitud: number, objetoActualizar){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(idSolicitud).update(objetoActualizar);
    }

    obtenerContratoPorSolicitud(idSolicitud: number){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaContratos).items.filter("SolicitudId eq " + idSolicitud).top(1).get());
        return respuesta;
    }

    obtenerMotivoSuspension() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaMotivoSuspension).items.get());
        return respuesta;
    }

    obtenerCausalExcepcion() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCausalExcepcion).items.get());
        return respuesta;
    }

    guardarIdContratoBienes(idBienes, idContrato){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(idBienes).update(
            {
                IdContrato: idContrato
            }
        );
        return respuesta;
    }

    guardarIdContratoServicios(idBienes, idContrato){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idBienes).update(
            {
                IdContrato: idContrato
            }
        );            
        return respuesta;                
    }

    ObtenerCondicionesTecnicasBienesxContrato(IdContrato){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.filter("IdContrato eq " + IdContrato).select("*","Solicitud/ID","AttachmentFiles").expand("Solicitud","AttachmentFiles").get());
        return respuesta;
    }

    ObtenerCondicionesTecnicasServiciosxContrato(IdContrato){
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.filter("IdContrato eq " + IdContrato).select("*","AttachmentFiles").expand("AttachmentFiles").get());
        return respuesta;
    }

}