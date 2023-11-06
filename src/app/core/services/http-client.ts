import { NsjAuthInstance } from '@core/authentication/nsj-autenticacao';
import { Catch } from "@core/decorators/catch";
import { ServerError } from "@core/services/server-error";
interface HttpResponse<T> extends Response {
    parsedBody?: T;
}
class HttpClient {

    @Catch('object', (error, ctx) => {
        console.error({ error, ctx });
        ServerError.showErrorPage(error.message);
    })

    private async http<T>(request: RequestInfo): Promise<HttpResponse<T>> {

        const response: HttpResponse<T> = await fetch(
            request
        );

        try {

            response.parsedBody = await response.json();

        } catch (ex) {

        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    };

    public async get<T>(
        url: string,
        authenticate: boolean = true,
        argsHeaders: HeadersInit = {}
    ): Promise<HttpResponse<T>> {

        const args = this.getRequest("get", authenticate, argsHeaders);

        return await this.http<T>(new Request(url, args));
    };

    public async post<T>(url: string,
        authenticate: boolean = true,
        argsHeaders: HeadersInit = {},
        body: any): Promise<HttpResponse<T>> {

        const args = this.getRequest("post", authenticate, argsHeaders, body);

        return await this.http<T>(new Request(url, args));
    };

    public async put<T>(url: string,
        authenticate: boolean = true,
        argsHeaders: HeadersInit = {},
        body: any): Promise<HttpResponse<T>> {

        const args = this.getRequest("put", authenticate, argsHeaders, body);

        return await this.http<T>(new Request(url, args));
    };

    private getRequest(method: string,
        authenticate: boolean,
        argsHeaders: HeadersInit,
        body: any = {}): RequestInit {

        let headersInit: HeadersInit;
        let requestInit: RequestInit;

        if (authenticate) {
            headersInit = { 'Content-Type': 'application/json', 'Authorization': "Bearer " + NsjAuthInstance.nsjAuth.token };
        } else {
            headersInit = { 'Content-Type': 'application/json' };
        }

        Object.assign(headersInit, argsHeaders);

        if (method == "get") {
            requestInit = { method: method, headers: headersInit };
        } else if (["post", "put"].includes(method)) {
            requestInit = { method: method, headers: headersInit, body: JSON.stringify(body) };
        }

        return requestInit;
    }

}

export const httpClient = new HttpClient();