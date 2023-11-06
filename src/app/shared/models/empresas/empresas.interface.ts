import { IPageconfig } from "@Shared/models/pagesconfig/pagesconfig.interface";
import { IClienteData } from "../clientes/clientes.interface";

export interface IEmpresa extends IPageconfig {
    data: IEmpresaData[];
}



export interface IEmpresaData {
    certificado: string | null;
    certificado_a_vencer: boolean | null;
    cliente_codigo: string;
    cliente_id: string;
    cnpj: string;
    emp_erp_id: string;
    emp_erp_codigo: string;
    certificate_name: string;
    id: string;
    nome: string;
    automacoes: [];
    updated_at: string;
    habilitar_automacao: boolean;
    gclick_id: string;
    created_at: Date;
    cliente : IClienteData;
    usa_certificado_procuracao: string | boolean | null;
    certificado_validade: string;
}

export interface ICertificados {
    id : string | null;
    procuracao: string | boolean | null;
    empresa: IEmpresaData;
    certificado_a_vencer: boolean | null;
    validade: string;
    vault_id: string | null;
}

