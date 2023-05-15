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