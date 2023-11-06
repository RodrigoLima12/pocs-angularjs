import { httpClient } from "@core/services/http-client";

export class ConfigService {

    public config: any;
    private static inst: ConfigService;

    private constructor() {
    }

    public async iniciarConfig() {
        if (!this.config) {
            const response = await httpClient.get<any>('/src/config/config.json', false);
            this.config = response.parsedBody;
        }
    }

    public setConfig(key: string, obj: any) {
        if (key && obj) {
            this.config[key] = obj;
        }
    }

    public async getConfig(key: string) {
        if (!this.config) {
            await this.iniciarConfig();
        }
        return this.config[key];
    }


    public static getConfigService(): ConfigService {
        if (!ConfigService.inst) {
            ConfigService.inst = new ConfigService();
        }
        return ConfigService.inst;
    }

}

export const configInstance: ConfigService = ConfigService.getConfigService();
