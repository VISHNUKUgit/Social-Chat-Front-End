import axios from 'axios';

export const commonRequest = async (method, url, data, headers) => {
    const reqConfig = {
        method,
        url,
        data,
        headers: headers ? headers : { 'Content-Type': 'application/json' }

    };

    try {
        const result = await axios(reqConfig);
        console.log(result);
        return result;
    } catch (error) {
        return error
    }
};
