import { PUBLIC_API_KEY_NASA } from "$env/static/public";

const BASE_URL = "https://api.nasa.gov/planetary/apod/";

let imgData = {
    date: typeof(String),
    title: typeof(String),
    url: typeof(String)
}

// this function returns the response of the API
async function API_REQUEST(){
    let url = BASE_URL + "?api_key=" + PUBLIC_API_KEY_NASA;
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
