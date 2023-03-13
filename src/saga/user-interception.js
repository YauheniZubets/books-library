import axios from "axios";

export const userToken = axios.interceptors.request.use( config => { // работает как слушатель события любого запроса, просто импорт в компоненте
    const currentToken = localStorage.getItem('jwt');
    let res = null;
    if (currentToken) {
        res = {...config,
            headers: {...config.headers, Authorization: `Bearer ${localStorage.getItem('jwt')}`}
        };
    } else {
        res = {...config, headers: {...config.headers }};
    }
    return res;
}, (error) => {
    console.log('error: ', error);
    Promise.reject(error);
});