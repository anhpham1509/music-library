import { alertConstants } from '../constants';

export interface Alert {
    type: String,
    message: String
}

const initialState: Alert = {
    type: "",
    message: ""
};

export const alert = (state = initialState, action: Alert) => {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };

        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };

        case alertConstants.CLEAR:
            return initialState;

        default:
            return initialState;
    }
}
