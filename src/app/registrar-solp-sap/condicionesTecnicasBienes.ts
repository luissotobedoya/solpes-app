export class CondicionesTecnicasBienes {

    constructor(public IdBienes: number,
        public codigo: string,
        public descripcion: string,
        public modelo: string,
        public fabricante: string,
        public cantidad: number,
        public cantidadRecibida:number,
        public totalCantidad:number,
        public UltimaEntregaCTB:boolean,
        public valorEstimado?: string,
        public comentario?: string,
        public CodigoVerificar?: string,
        public ModeloVerificar?: string,
        public FabricanteVerificar?: string,
        public CantidadVerificar?: number,
        public ExistenciasVerificar?: number,
        public NumReservaVerificar?: string,
        public CantidadReservaVerificar?: number,
        public EntradaSolicitanteVerificar?: string,
        public CodigoSondeo?: string,
        public CantidadSondeo?: number,
        public PrecioSondeo?: number,
        public ComentarioSondeo?: string,
        public Estado?: any
    ) {

    }

    public static fromJson(element: any) {
        return new CondicionesTecnicasBienes(element.Id ,element.Codigo, element.Descripcion, element.Modelo, element.Fabricante, element.Cantidad, element.CantidadRecibida, element.CantidadVerificar-element.CantidadRecibida,element.UltimaEntrega,element.ValorEstimado,element.Comentarios,element.CodigoVerificar,element.ModeloVerificar,element.FabricanteVerificar,
            element.CantidadVerificar,element.ExistenciasVerificar,element.NumReservaVerificar,element.CantidadReservaVerificar,element.EntradaSolicitanteVerificar,element.CodigoSondeo,element.CantidadSondeo,element.PrecioSondeo,
            element.ComentarioSondeo);
    }


    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }


}