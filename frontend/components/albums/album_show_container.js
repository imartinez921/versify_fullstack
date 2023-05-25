import { connect } from "react-redux";
import { clearCurrent,
} from "../../actions/playlists_actions";
import { displayAlbum,
} from "../../actions/album_actions";

import AlbumShow from "./album_show";

const mapStateToProps = (state, ownProps) => {

    return {
    currentAlbum: state.entities.currentItem,
    tracks: state.entities.songs,
    params: ownProps.params,
    history: ownProps.history,
    currentUser: ownProps.currentUser,
}}

const mapDispatchToProps = dispatch => ({
    displayAlbum: (albumId) => dispatch( displayAlbum(albumId) ),
    clearCurrent: () => dispatch( clearCurrent() ),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumShow);