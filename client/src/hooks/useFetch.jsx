import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
    const [giUrl, setGiUrl] = useState("");

    const fetchGifs = async () => {
        try{
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            const { data } = await response.json();

            setGiUrl(data[0]?.images?.downsized_medium?.url);
        }catch(error){
            setGiUrl("https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif");
        }
    }

    useEffect(() => {
        if(keyword){
            fetchGifs();
        }
    }, [keyword]);

    return giUrl;
}

export default useFetch;