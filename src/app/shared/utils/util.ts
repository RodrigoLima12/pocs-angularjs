export function converteStringParaFloat(valorString: string){
    if(valorString && isNumberic(valorString)){
        return parseFloat(valorString).toFixed(2);
    }
    return 0.00
}

export function isNumberic(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function getTimeZone(){
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}