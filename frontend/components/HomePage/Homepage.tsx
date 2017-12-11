import * as React from "react";
import { connect } from "react-redux";
import { SongComponent } from "../Song";
import { Song } from "../../reducers/songs";
import { getSongs } from "../../actions/song";
import { ConnectedAlertBar } from "../AlertBar";

class Homepage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, auth } = this.props;
        // console.log(auth.token);
        dispatch(getSongs(auth.token));
    }

    render() {
        const { songs } = this.props;
        return (
            <div className="songs-grid">
                <div className="container-fluid page-title">
                    <div className="row">
                        <div className="container">
                            <h1>Featured Songs</h1>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <ConnectedAlertBar />
                        {
                            Array.isArray(songs) ? songs.map((song: Song) => (
                                <SongComponent artist={song.artist} title={song.title} url={song.url} cover={song.cover} />)
                            ) : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    const { auth, songs } = state;
    return {
        auth,
        songs
    };
}

export const ConnectedHomePage = connect(mapStateToProps)(Homepage);