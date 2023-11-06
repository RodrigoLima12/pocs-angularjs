import { IPageconfig } from "@Shared/models/pagesconfig/pagesconfig.interface";

export interface ITenant extends IPageconfig{
    data: ITenantData[];
}

export interface ITenantData {
    id: string;
    codigo: string;
    created_at: Date;
    updated_at: Date;
    database_server: string;
    database_port: string;
    database_name: string;
    erp_path: string;
    erp_user: string;
    erp_password: string;
    ana_data_base_url: string;
}