<script context="module">
	const BASE_URL = "http://api.weatherapi.com/v1/";
	const API_KEY = "d02fc8f55f1a44e481294946230304";

	let weatherDataObject = {
		location: typeof(String),
		temp_C: typeof(String),
		feelslike_c: typeof(String),
		condition: typeof(String),
		humidity: typeof(String)
	}

	/**
	 * @param {string} location
	 */
	async function API_REQUEST(location){
		let url = BASE_URL + "current.json?key=" + API_KEY + "&q=" + location;

        return await fetch(
            url,
            {
                method: 'GET',
            }
        );
	}

	/**
	 * @param {string} location
	 */
	export async function getCurrentWeatherData(location){
		const response = await API_REQUEST(location);
        const data = await response.json();		

		weatherDataObject = {
			location: data.location.name,
			temp_C: data.current.temp_c,
			feelslike_c: data.current.feelslike_c,
			condition: data.current.condition.text,
			humidity: data.current.humidity
		}

		if (response.ok){
			return weatherDataObject;
		} else {
			throw new Error(data)
		}
	}
</script>