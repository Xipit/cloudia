export function applySettingToTemp(settings: any, temp:any):string {
    if(settings == undefined){
        return `${temp.c}°C`;
    }

    switch(settings.temperature_unit){
        case 'kelvin':
            return `${temp.k}K`;
            break;
            
        case 'fahrenheit':
            return `${temp.f}°F`;
            break;
            
        default:
        case 'celsius':
            return `${temp.c}°C`;
            break;
    }
}

export function applySettingToSpeed(settings: any, speed:any):string {
    if(settings == undefined){
        return `${speed.kph} km/h`;
    }

    switch(settings.speed_unit){
    
        case 'ms':
            return `${speed.ms} m/s`;
            break;
            
        case 'beaufort':
            return `${speed.beaufort} Beaufort`;
            break;
            
        case 'knot':
            return `${speed.knot} Knoten`;
            break;

        default:
        case 'kmh':
            return `${speed.kph} km/h`;
            break;
    }
}