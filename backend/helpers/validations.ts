const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidLoginParams = params => {
    return regexpEmail.test(params.email) && params.password;
}

export const isValidRegisterParams = params => {
    return regexpEmail.test(params.email) && params.password && params.name;
}