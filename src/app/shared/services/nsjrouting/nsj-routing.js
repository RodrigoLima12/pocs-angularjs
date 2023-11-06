angular.module('nsjRouting', [])
.provider('nsjRouting', function () {
    var config = {
        baseParams: {
        }
    };

    return {
        config: config,
        $get: function () {
            return {
                generate: function (route, opt_params, absolute) {
                    //Sempre que a função é gerada, eu atualizo o tenant/grupoempresarial na globals
                    if((typeof(nsj)!='undefined') && nsj.globals){
                        const globalsInstance = nsj.globals.getInstance();

                        if(globalsInstance.a && globalsInstance.a.tenantCodigo){
                            config.baseParams['tenant'] = globalsInstance.get('tenantCodigo');
                        }
                    }

                    var params = angular.extend(angular.copy(config.baseParams), (opt_params || {}));
                    var ret = Routing.generate(route, params, absolute);
                    return ret;
                }
            };
        }
    };
});