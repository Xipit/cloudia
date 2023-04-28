export class Cache{
    // make this class a Singleton:
    private static instance: Cache;

    constructor() {
        if (!!Cache.instance) {
            return Cache.instance;
        }
        Cache.instance = this;
        return this;
    }

    async fetchWithCache(localStorageKey: string, url: string, fetchOptions: RequestInit, expiresAfterMinutes: number, oneRefreshPerDay = false): Promise<any>{
        const cachedData = localStorage.getItem(localStorageKey);

        if (cachedData) {
            let data = JSON.parse(cachedData);

            if (data.oneRefreshPerDay == oneRefreshPerDay) {
                let createdDate = new Date(data.cacheCreatedTimestamp).getDate();
                let dateToday = new Date(Date.now()).getDate();

                // return data if it was created today
                if (createdDate == dateToday) {
                    return data;
                }
            } else {
                // current lifetime of cache in minutes
                let currentLifeMinutes = (Date.now() - data.cacheCreatedTimestamp) / 1000 / 60;

                // checks if cachedData is expired
                if (currentLifeMinutes > expiresAfterMinutes) {
                    localStorage.removeItem(localStorageKey);
                } else {
                    return data;
                }
            }
        }

        const response = await fetch(url, fetchOptions);
        const data = await response.json();

        if (response.ok){
            let timestampNow = Date.now();
            data.cacheCreatedTimestamp = timestampNow;
            data.expiresAfterMinutes = expiresAfterMinutes;
            data.oneRefreshPerDay = oneRefreshPerDay;
            localStorage.setItem(localStorageKey, JSON.stringify(data));
        } else {
            console.log("Errorcode: " + data.error.code + ", Errormessage: " + data.error.message);
        }

        return data;
    }
}