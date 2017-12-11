import * as React from "react";
import { connect } from "react-redux";
import "./AlertBar.scss";

class AlertBar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { alert } = this.props;
        return alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>;
    }
}

const mapStateToProps = (state: any) => {
    const { alert } = state;
    return {
        alert
    };
}

export const ConnectedAlertBar = connect(mapStateToProps)(AlertBar);