import axios, {AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"


export const apiPixMercadoPago = axios.create({
    baseURL: "https://api.mercadopago.com"
})
;
apiPixMercadoPago.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const token = "TEST-2704072685557925-111315-0471edca3a39534d32946ac6530191d3-1441761391";
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`;
    return config as InternalAxiosRequestConfig; // Don't forget to return the config
  });
