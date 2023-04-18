<script context="module">
	const BASE_URL = "https://api.visibleplanets.dev/v3"

	/**
	 * @param {string | number | undefined} latitude
	 * @param {string | number | undefined} longitude
	 */
	async function API_REQUEST(latitude, longitude){
		// url https://api.visibleplanets.dev/v3?latitude=32&longitude=-98&showCoords=true
		let url = BASE_URL + "?latitude=" + latitude + "&longitude=" + longitude + "&showCoords=true";

        return await fetch(
            url,
            {
                method: 'GET',
            }
        );
	}

	/**
	 * @param {number} [latitude]
	 * @param {number} [longitude]
	 */
	export async function getVisiblePlanetsData(latitude, longitude){
		const response = await API_REQUEST(latitude, longitude);
        const data = await response.json();

		if (response.ok){
			return data.data;
		} else {
			throw new Error(data)
		}
	}

	/**
	 * @param {number} deg
	 
	function AzimuthToCompassDirection(deg){

		if ((deg < 45) || (deg >= 315)) {
			return "North";
		} else if ((deg < 315) && (deg >= 225)){
			return "West";
		} else if ((deg < 225) && (deg >= 135)) {
			return "South";
		} else if ((deg < 135) && (deg >= 45)) {
			return "East";
		}
	}	*/
</script>