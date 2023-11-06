import { IPageconfig } from "@Shared/models/pagesconfig/pagesconfig.interface";

export interface ITarefa extends IPageconfig {
    data: ITarefaData[];
}

export interface ITarefaData {
    id: string;
    routine_name: string;
    empresa: string;
    created_at: Date;
    started_at: Date;
    date_done: Date;
    date_done_relative: string;
    status: string;
    resultado: string;
    result: object;
    kwargs: ITarefaKwargs;
    tenant_id: string | null;
}

export interface ITarefaKwargs {
    callback_endpoint: string;
    cliente_id: string;
    empresa_id: string;
    matricula_trabalhador: string;
    solicitacao_id: string;
    ano?: string;
    cliente?: string;
    competencia?: string;
    data_pagamento?: string;
    empresa?: string;
    empresa_cliente?: string;
    project_name?: string;
    routine_name?: string;
    tenant?: string;
}

export interface IResultadoAutomacao {
    message: string;
    job_id: string;
}

export interface IAutomacao {
    nome_automacao: string;
    codigo_mope: string;
}

export interface IAgendamentoData extends IPageconfig {
    data: IAgendamentoData[];
}

export interface IAgendamentoData {
    id: string;
    routine_name: string;
    empresa: string;
    created_at: Date;
    started_at: Date;    
    datahora: string;
    agendador: string;
    parametros: any[];
}