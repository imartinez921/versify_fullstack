import { connect } from "react-redux";
import { clearCurrent,
} from "../../actions/playlist_actions";
import { displayAlbum,
} from "../../actions/album_actions";
import { openAlbumNavDropdown,
    closeAlbumNavDropdown,
} from "../../actions/ui_actions";

import AlbumShow from "./album_show";

const mapStateToProps = ({
    entities: { currentItem, songs, playlists } // from state
}, { params, history, currentUser // from ownProps
}) => {
    return {
    currentAlbum: currentItem,
    tracks: songs,
    params: params,
    history: history,
    currentUser: currentUser,
    source: "album",
    songCardDropdownItems: [
        {
            title: "Add to playlist",
            submenu: [playlists],
        }
    ],
}}

const mapDispatchToProps = dispatch => ({
    closeAlbumNavDropdown: () => dispatch( closeAlbumNavDropdown() ),
    openAlbumNavDropdown: () => dispatch( openAlbumNavDropdown() ),
    displayAlbum: (albumId) => dispatch( displayAlbum(albumId) ),
    clearCurrent: () => dispatch( clearCurrent() ),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumShow);