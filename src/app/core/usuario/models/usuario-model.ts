export interface Usuario {
    conta_url: string;
    logout_url?: string;
    username: string;
    email: string;
    nome: string;
    organizacoes?: [];
    roles?: string[];
    contanaoencontrada?: boolean;
}
