import axios from 'axios'

const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '50',
        offset: '0'
    },
    headers: {
        'X-RapidAPI-Key': '92b73898bemsh2c316559e295eebp1f92cfjsnde234ac85590',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};
export const fetchCoins = async () => {
    try {
        const response = await axios.request(options);

        return response.data.data.coins
    } catch (error) {
        console.error(error);
        return null
    }
}
export const fetchUserCoins = async (_id: string) => {
    const data = await fetch("http://moes-macbook-pro-ii.local:3000/api/getcoins/", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
    })
        .then(async (res) => {
            const isJson = res.headers
                .get("content-type")
                ?.includes("application/json");
            const data = isJson ? await res.json() : null;

            if (!res.ok) {
                const error = (data && data.error) || res.statusText;


                return Promise.reject(error);
            } else if (res.ok) {
                return data.data

            }
        })
        .catch((err) => {
            return null
        });
    return data
}