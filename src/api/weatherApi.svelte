<!-- This has to be used because the weather API returns "http://..." instead of "https://...". -->
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

<script context="module">
	const BASE_URL = "http://api.weatherapi.com/v1/";
	const API_KEY = "d02fc8f55f1a44e481294946230304";

	/**
	 * @type {number | undefined}
	 */
	export let latitude;
	/**
	 * @type {number | undefined}
	 */
	export let longitude;

	/**
	 * @param {string} location
	 */
	async function API_REQUEST(location){
		let url = BASE_URL + "current.json?key=" + API_KEY + "&q=" + location;

        return await fetch(
            url,
            {
                method: 'GET',
				headers: {
                	'Access-Control-Allow-Origin': '*',
            	}
            }
        );
	}

	/**
	 * @param {string} location
	 */
	export async function getCurrentWeatherData(location){
		const response = await API_REQUEST(location);
        const data = await response.json();		

		if (response.ok){
			return data;
		} else {
			// TODO: Handle error if the location doesn't exists (example: "dfsds")
			throw new Error(data)
		}
	}
</script>