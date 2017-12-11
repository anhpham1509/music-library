import { AxiosRequestConfig } from "axios";

const RequestOpts = (method: String, url: String, data: any, sessionToken: String) => <AxiosRequestConfig> ({
    method: method,
    url: url,
    headers: { 'Authorization': sessionToken },
    data: data,

    baseURL: '/api',

    timeout: 60000,
    withCredentials: false, // default

    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default

    xsrfCookieName: 'XSRF-TOKEN', // default
    xsrfHeaderName: 'X-XSRF-TOKEN', // default

    //maxContentLength: 2000, // max size of the http response content allowed

    validateStatus: (status: number) => {
        return status >= 200 && status < 300; // default
    },

    maxRedirects: 5, // default
});

export const HttpRequest = {
    Get: (url: String, sessionToken: String) => RequestOpts('get', url, null, sessionToken),
    Post: (url: String, data: any, sessionToken: String) => RequestOpts('post', url, data, sessionToken),
    Put: (url: String, data: any, sessionToken: String) => RequestOpts('put', url, data, sessionToken),
    Delete: (url: String, sessionToken: String) => RequestOpts('delete', url, null, sessionToken)
};