import * as React from "react";
import { connect } from "react-redux";
import "./Song.scss";
import { Song } from "../../reducers/songs";

class SongComponent extends React.Component<Song, any> {
    constructor(props: Song) {
        super(props);
    }

    render() {
        const { artist, title, cover, url } = this.props;
        return (
            <div className="col-xs-12 col-sm-3">
                <article className="song-card song-card--compact">
                    <div className="song-card__image">
                        <img src={cover} alt={title} />
                    </div>

                    <div className="song-card__main">
                        <a href={url}>
                            <i className="fa fa-external-link" aria-hidden="true"></i>
                        </a>
                        <h6 className="song-card__artist">{artist}</h6>
                        <h5 className="song-card__title">{title}</h5>
                    </div>
                </article>
            </div>
        );
    }
}

export { SongComponent };