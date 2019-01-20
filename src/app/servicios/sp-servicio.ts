import { environment } from "src/environments/environment";
import { default as pnp, Web } from 'sp-pnp-js';
import { Injectable } from "@angular/core";
import { from } from 'rxjs';
import { Solicitud } from "../dominio/solicitud";
import { CondicionTecnicaBienes } from "../dominio/condicionTecnicaBienes";
import { CondicionTecnicaServicios } from "../dominio/condicionTecnicaServicios";
import { RecepcionBienes } from "../entrega-bienes/recepcionBienes";
import { RecepcionServicios } from "../entrega-servicios/recepcionServicios";

@Injectable()
export class SPServicio {
    constructor() { }

    public obtenerConfiguracion() {
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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5iQ3dXMTF3M1hrQi14VWFYd0tSU0xqTUhHUSIsImtpZCI6Im5iQ3dXMTF3M1hrQi14VWFYd0tSU0xqTUhHUSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTQ4MDEwMjk1LCJuYmYiOjE1NDgwMTAyOTUsImV4cCI6MTU0ODAzOTM5NSwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI2NTQ4ZDEyMS1jMDUxLTQ3YTEtYWYyYi1lZmRlYzVmOTllNGNAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiOGY4NjgwNDUtN2VlZS00Mzc0LWEyZjEtMzA3OTIzODcwYWM3Iiwic3ViIjoiOGY4NjgwNDUtN2VlZS00Mzc0LWEyZjEtMzA3OTIzODcwYWM3IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.j2G5PA9-YfEfXyKij6B9SVXZsveWPPfxfJev9jhecrCwvjsdFJ0H78O8CCZP4Go71UcGl28OuS3amPUrjD1-Fz9IgK8wQ6wef_12YIYUxX894xru0rJIVvZv_mLaFcXoZ7hXffb-f-Wwjv6UJn4G6Zq6GCWjJyF6udNBTjU6zDAxrBzgo2unNBzTb8_n7eI2N5nYE2UAxMAV2meHN-Dil5cey7KidS0nMFt3UPfxqN6D8awdgWf4sbnZJrT3heJrCjZbiYEVgiYGmVv0SAwMqEMBSZGt1MHVCzptmI7V-tTJzDGFvrm450z9k3IGFeswMrQMhH6KIfKSbUrFyziNBg'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    ObtenerUsuarioActual() {
        let respuesta = from(this.obtenerConfiguracion().web.currentUser.get());
        return respuesta;
    }

    ObtenerTodosLosUsuarios() {
        let respuesta = from(this.obtenerConfiguracion().web.siteUsers.get());
        return respuesta;
    }

    ObtenerUsuarioPorEmail(email : string){
        let respuesta = from(this.obtenerConfiguracion().web.siteUsers.getByEmail(email).get());
        return respuesta;
    }

    ObtenerTiposSolicitud() {
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaTiposSolicitud).items.getAll());
        return respuesta;
    }

    ObtenerEmpresas() {
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaEmpresas).items.getAll());
        return respuesta;
    }

    ObtenerPaises() {
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaPaises).items.getAll());
        return respuesta;
    }

    ObtenerCategorias() {
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaCategorias).items.getAll());
        return respuesta;
    }

    ObtenerSubcategorias(idCategoria: number, idPais: number) {
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaSubcategorias).items.select("ID", "Title", "Categoria/Title", "Categoria/ID", "Comprador/Title", "Comprador/ID", "Pais/Title", "Pais/ID", "CondicionesTecnicas/Title", "CondicionesTecnicas/ID").expand("Categoria", "Comprador", "CondicionesTecnicas", "Pais").filter("CategoriaId eq " + idCategoria + "and PaisId eq " + idPais).get());
        return respuesta;
    }

    obtenerMisSolicitudes(usuarioId: number) {
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.select("ID", "Title", "TipoSolicitud", "Solicitante", "Empresa/Title", "OrdenadorGastos/Title", "Pais/ID", "Pais/Title", "Empresa/Title", "Empresa/ID", "Comprador", "Categoria", "Subcategoria", "CM", "CondicionesContractuales", "Alcance", "Justificacion", "FechaDeseadaEntrega", "Estado", "Author/Title", "Author/ID", "Created", "Consecutivo").expand("Empresa", "Pais", "OrdenadorGastos", "Author").filter("AuthorId eq " + usuarioId + " ").get());
        return respuesta;
    }

    agregarSolicitud(solicitud: Solicitud) {
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaSolicitudes).items.add({
            Title: solicitud.titulo,
            TipoSolicitud: solicitud.tipoSolicitud,
            CM: solicitud.cm,
            Solicitante: solicitud.solicitante,
            EmpresaId: solicitud.empresa,
            OrdenadorGastosId: solicitud.ordenadorGastos,
            PaisId: solicitud.pais,
            Categoria: solicitud.categoria,
            Subcategoria: solicitud.subcategoria,
            Comprador: solicitud.comprador,
            FechaDeseadaEntrega: solicitud.fechaEntregaDeseada,
            Alcance: solicitud.alcance,
            Justificacion: solicitud.justificacion,
            CondicionesContractuales: solicitud.condicionesContractuales,
            ResponsableId: solicitud.responsable,
            Estado: solicitud.estado,
            AuthorId: solicitud.autor
        });
    }

    borrarSolicitud(Idsolicitud: number){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaSolicitudes).items.getById(Idsolicitud).delete();
    }

    actualizarSolicitud(idSolicitud: number, solicitud: Solicitud){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaSolicitudes).items.getById(idSolicitud).update({
            Title: solicitud.titulo,
            TipoSolicitud: solicitud.tipoSolicitud,
            CM: solicitud.cm,
            Solicitante: solicitud.solicitante,
            EmpresaId: solicitud.empresa,
            OrdenadorGastosId: solicitud.ordenadorGastos,
            PaisId: solicitud.pais,
            Categoria: solicitud.categoria,
            Subcategoria: solicitud.subcategoria,
            Comprador: solicitud.comprador,
            FechaDeseadaEntrega: solicitud.fechaEntregaDeseada,
            Alcance: solicitud.alcance,
            Justificacion: solicitud.justificacion,
            CondicionesContractuales: solicitud.condicionesContractuales,
            ResponsableId: solicitud.responsable,
            CompraBienes: solicitud.compraBienes,
            CompraServicios: solicitud.compraServicios,
            Estado: solicitud.estado
        });
    }

    agregarCondicionesTecnicasBienes(condicionTecnicaBienes: CondicionTecnicaBienes) {
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.add({
            Title: condicionTecnicaBienes.titulo,
            SolicitudId: condicionTecnicaBienes.idSolicitud,
            Codigo: condicionTecnicaBienes.codigo,
            Descripcion: condicionTecnicaBienes.descripcion,
            Modelo: condicionTecnicaBienes.modelo,
            Fabricante: condicionTecnicaBienes.fabricante,
            Cantidad: condicionTecnicaBienes.cantidad,
            ValorEstimado: condicionTecnicaBienes.valorEstimado,
            Comentarios: condicionTecnicaBienes.comentarios
        });
    }

    actualizarCondicionesTecnicasBienes(idCondicionTecnicaBienes: number, condicionTecnicaBienes: CondicionTecnicaBienes){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(idCondicionTecnicaBienes).update({
            Title: condicionTecnicaBienes.titulo,
            SolicitudId: condicionTecnicaBienes.idSolicitud,
            Codigo: condicionTecnicaBienes.codigo,
            Descripcion: condicionTecnicaBienes.descripcion,
            Modelo: condicionTecnicaBienes.modelo,
            Fabricante: condicionTecnicaBienes.fabricante,
            Cantidad: condicionTecnicaBienes.cantidad,
            ValorEstimado: condicionTecnicaBienes.valorEstimado,
            Comentarios: condicionTecnicaBienes.comentarios
        });
    }

    actualizarCondicionesTecnicasBienesEntregaBienes(IdBienes,objActualizacionCTB){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(IdBienes).update(
            objActualizacionCTB
        );
    }

    borrarCondicionTecnicaBienes(idCondicionTecnicaBienes: number){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(idCondicionTecnicaBienes).delete();
    }

    agregarAdjuntoCondicionesTecnicasBienes(idCondicion: number, nombreArchivo: string, archivo: File) {
        let item = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(idCondicion);
        return item.attachmentFiles.add(nombreArchivo, archivo);
    }

    borrarAdjuntoCondicionesTecnicasBienes(idCondicion: number, nombreArchivo: string){
        let item = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(idCondicion);
        return item.attachmentFiles.getByName(nombreArchivo).delete();
    }

    agregarCondicionesTecnicasServicios(condicionTecnicaServicios: CondicionTecnicaServicios) {
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.add({
            Title: condicionTecnicaServicios.titulo,
            SolicitudId: condicionTecnicaServicios.idSolicitud,
            Codigo: condicionTecnicaServicios.codigo,
            Descripcion: condicionTecnicaServicios.descripcion,
            Cantidad: condicionTecnicaServicios.cantidad,
            ValorEstimado: condicionTecnicaServicios.valorEstimado,
            Comentario: condicionTecnicaServicios.comentarios
        });
    }

    actualizarCondicionesTecnicasServicios(idCondicionTecnicaServicios: number, condicionTecnicaServicios: CondicionTecnicaServicios){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idCondicionTecnicaServicios).update({
            Title: condicionTecnicaServicios.titulo,
            SolicitudId: condicionTecnicaServicios.idSolicitud,
            Codigo: condicionTecnicaServicios.codigo,
            Descripcion: condicionTecnicaServicios.descripcion,
            Cantidad: condicionTecnicaServicios.cantidad,
            ValorEstimado: condicionTecnicaServicios.valorEstimado,
            Comentario: condicionTecnicaServicios.comentarios
        });
    }

    borrarCondicionTecnicaServicios(idCondicionTecnicaServicios: number){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idCondicionTecnicaServicios).delete();
    }

    agregarAdjuntoCondicionesTecnicasServicios(idSolicitud: number, nombreArchivo: string, archivo: File) {
        let item = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idSolicitud);
        return item.attachmentFiles.add(nombreArchivo, archivo);
    }

    borraAdjuntoCondicionesTecnicasServicios(idCondicion: number, nombreArchivo: string){
        let item = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idCondicion);
        return item.attachmentFiles.getByName(nombreArchivo).delete();
    }

    obtenerParametrosConfiguracion(){
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaConfiguracion).items.filter("Title eq 'Configuración'").get());
        return respuesta;
    }

    obtenerdatosProfile(){
        let respuesta = from(this.obtenerConfiguracion().profiles.myProperties.get());
        return respuesta;
    }

    ObtenerSolicitudBienesServicios(IdSolicitud){
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).select("Id","FechaDeseadaEntrega","Solicitante","OrdenadorGastos/Title","Empresa/Title","Pais/Title","Categoria","Subcategoria","Comprador","Alcance","Justificacion","CondicionesContractuales","AuthorId").expand("OrdenadorGastos","Empresa","Pais").get());
        return respuesta;
    }

    ObtenerCondicionesTecnicasBienes(IdSolicitud){
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.filter("SolicitudId eq " + IdSolicitud).get());
        return respuesta;
    }

    ObtenerRecepcionesBienes(IdSolicitud){
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionBienes).items.filter("IdSolicitudId eq '" + IdSolicitud + "' and recibidoSap eq '0'").get());
        return respuesta;
    }

    GuardarBienesRecibidos(ObjRecepcionBienes: RecepcionBienes,IdSolicitud){
        let RecepcionBienesObj = {
            IdSolicitudId: IdSolicitud,
            IdCTBienesId: ObjRecepcionBienes.Idbienes,
            Descripcion: ObjRecepcionBienes.descripcion,
            Cantidad: ObjRecepcionBienes.cantidad,
            Valor: ObjRecepcionBienes.valor,
            UltimaEntrega: ObjRecepcionBienes.ultimaEntrega,
            Comentario: ObjRecepcionBienes.comentario,
            FechaRecepcion: new Date()
        };
        let elemento = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaRecepcionBienes).items.add(RecepcionBienesObj);
        return elemento;
    }

    actualizarBienesRecibidos(IdBienes){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaRecepcionBienes).items.getById(IdBienes).update({
            UltimaEntrega: true
        });
    }

    eliminarBienesRecibidos(idBienes){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaRecepcionBienes).items.getById(idBienes).delete();
    }

    ConfirmarEntregaBienes(IdBienes){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaRecepcionBienes).items.getById(IdBienes).update({
            Estado: "Confirmado"
        }); 
    }

    cambioEstadoRecepcionBienesServicios(IdSolicitud, nombreEstado, Autor){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(
            {
                Estado: nombreEstado,
                FaltaRecpcion: true,
                Responsable: Autor
            }
        );
    } 
    
    ObtenerCondicionesTecnicasServicios(IdSolicitud){
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.filter("SolicitudId eq " + IdSolicitud).get());
        return respuesta;
    }

    ObtenerRecepcionesServicios(IdSolicitud:number){
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaRecepcionServicios).items.filter("IdSolicitudId eq '" + IdSolicitud + "' and recibidoSap eq '0'").get());
        return respuesta;
        }

    GuardarServiciosRecibidos(ObjRecepcionServicios: RecepcionServicios,IdSolicitud){
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
            Mes: ObjRecepcionServicios.mes
        };
        let elemento = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaRecepcionServicios).items.add(RecepcionBienesObj);
        return elemento;
    }

    actualizarCondicionesTecnicasServiciosEntregaServicios(IdServicio,objActualizacionCTS){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(IdServicio).update(
            objActualizacionCTS
        );
    }

    actualizarServiciosRecibidos(IdServicios){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaRecepcionServicios).items.getById(IdServicios).update({
            UltimaEntrega: true
        });
    }

    eliminarServiciosRecibidos(idServicios){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaRecepcionServicios).items.getById(idServicios).delete();
    }

    ConfirmarEntregaServicios(IdServicios){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaRecepcionServicios).items.getById(IdServicios).update({
            Estado: "Confirmado"
        }); 
    }

    GuardarContrato(ObjContrato){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaContratos).items.add(ObjContrato);
    }

    cambioEstadoSolicitud(IdSolicitud, nombreEstado, autor){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(
            {
                Estado: nombreEstado,
                Responsable: autor
            }
        );
    }
    
    ObtenerMisPendientes(usuarioId){
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaSolicitudes).items.select("ID", "Title", "TipoSolicitud", "Solicitante", "Empresa/Title", "OrdenadorGastos/Title", "Pais/ID", "Pais/Title", "Empresa/Title", "Empresa/ID", "Comprador", "Categoria", "Subcategoria", "CM", "CondicionesContractuales", "Alcance", "Justificacion", "FechaDeseadaEntrega", "Estado", "Author/Title", "Author/ID", "Created" , "CompraBienes", "CompraServicios").expand("Empresa", "Pais", "OrdenadorGastos", "Author").filter("Responsable eq '"+usuarioId+"' and Estado ne 'Finalizado' and Estado ne 'Rechazado' and Estado ne 'Descartado'").get());
        return respuesta;
    }

    guardarComentario(IdSolicitud, coment){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(coment);
        return respuesta;
    }

    obtenerResponsableProcesos(IdPais){
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaResponsableProceso).items.filter("PaisId eq '"+IdPais+"'").getAll());  
        return respuesta;
    }

    guardarVerificarMaterial(IdSolicitud, objGuardarVerificar){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(IdSolicitud).update(objGuardarVerificar);
        return respuesta;
    }

    ObtenerContratos(IdSolicitud){
        let respuesta = from(this.obtenerConfiguracion().web.lists.getByTitle(environment.listaContratos).items.getAll());
        return respuesta;
    }

    guardarSondeoBienes(idCondicion, objSondeo){   
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasBienes).items.getById(idCondicion).update(objSondeo);        
        return respuesta;
    }

    guardarSondeoServicios(idCondicion, objSondeo){   
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaCondicionesTecnicasServicios).items.getById(idCondicion).update(objSondeo);        
        return respuesta;
    }

    guardarRegSondeo(IdSolicitud, ObjSolpSap){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(ObjSolpSap);
        return respuesta;
    }

    guardarSOLPSAP(IdSolicitud, ObjSolpSap){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaSolicitudes).items.getById(IdSolicitud).update(ObjSolpSap);
        return respuesta;
    }

    registrarRecepcionBienes(IdRecepcion, objRegistrar){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaRecepcionServicios).items.getById(IdRecepcion).update(objRegistrar);
        return respuesta;
    }

    registrarRecepcion(IdRecepcion, objRegistrar){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaRecepcionServicios).items.getById(IdRecepcion).update(objRegistrar);
        return respuesta;
    }

}