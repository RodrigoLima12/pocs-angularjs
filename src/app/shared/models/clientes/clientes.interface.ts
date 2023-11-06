import { IPageconfig } from "@Shared/models/pagesconfig/pagesconfig.interface";

export interface ICliente extends IPageconfig{
    data: IClienteData[];
}




export interface IClienteData {
    id: string;
    nome: string;
    tenant_id: string;
    tenant_codigo: string;
    faturamento_ativo: boolean;
    automacao_solicitacoes_ligada: boolean;
    //quantidade_empresas: number;
}