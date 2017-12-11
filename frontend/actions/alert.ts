import { alertConstants } from '../constants';

const success = (message: String) => {
    return {
        type: alertConstants.SUCCESS,
        message: message
    };
}

const error = (message: String) => {
    return {
        type: alertConstants.ERROR,
        message: message
    };
}

const clear = () => {
    return {
        type: alertConstants.CLEAR
    };
}

export {
    success,
    error,
    clear
};
