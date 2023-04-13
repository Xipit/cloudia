<script context="module">
    const BASE_URL = "https://api.nasa.gov/planetary/apod/";
    const API_KEY = "WMC1WMgpAQshc3x9ye52j44seSmdfzUeoXGwlwHK";

    let imgData = {
        date: typeof(String),
        title: typeof(String),
        url: typeof(String)
    }

    // this function returns the response of the API
    async function API_REQUEST(){
        let url = BASE_URL + "?api_key=" + API_KEY;

        return await fetch(
            url,
            {
                method: 'GET',
            }
        );
    }

    // this function can be called from the outside to get the information for the APOD
    export async function getAPOD(){
        const response = await API_REQUEST();
        const data = await response.json();

        imgData = {
            date: data.date,
            title: data.title,
            url: data.url
        }

        if (response.ok){
			return imgData;
		} else {
			throw new Error(data)
		}
    }

</script>