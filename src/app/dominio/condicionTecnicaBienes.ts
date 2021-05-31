export class CondicionTecnicaBienes {
    constructor(
        public indice: number,
        public titulo: string,
        public idSolicitud: any,
        public codigo: string,
        public descripcion: string,
        public nombre: string,
        public modelo: string,
        public fabricante: string,
        public cantidad: number,
        public valorEstimado: number,
        public comentarios: string,
        public archivoAdjunto?: File,
        public rutaAdjunto?: string,
        public tipoMoneda?: string,
        public dataServiceNow?: string,
        public codBarras?: string,
        public id?: number,
        public costoInversion?: string,
        public numeroCostoInversion?: string,
        public numeroCuenta?: string,
        public orden?: number,
        public tieneIdServicio?: boolean,
        public idOrdenServicio?: string,
        public DetalleDistribucion?: string,
        ) { }

    public static fromJson(element: any) {
        return new CondicionTecnicaBienes(
            element.ID,
            element.Title,
            element.Solicitud,
            element.Codigo,
            element.Descripcion,
            element.Nombre,
            element.Modelo,
            element.Fabricante,
            element.Cantidad,
            element.ValorEstimado,
            element.Comentarios,
            element.AttachmentFiles,
            element.AttachmentFiles,
            element.TipoMoneda,
            element.dataServiceNow || '',
            element.CodigoBarras,
            element.ID,
            element.costoInversion,
            element.numeroCostoInversion,
            element.numeroCuenta,
            element.Orden,
            element.tieneIdServicio,
            element.IdOrdenServicio,
            element.DetalleDistribucion)
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }


}