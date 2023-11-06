import { IPageconfig } from "@Shared/models/pagesconfig/pagesconfig.interface";

export interface IRelatorio extends IPageconfig{
    data: IRelatorioData[];
}

export interface IRelatorioData {
    codigo_mope: string;
    created_at: Date;
    empresa_id: string;
    id: string;
    parametros: string;
    updated_at: Date;
}
