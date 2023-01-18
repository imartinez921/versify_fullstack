import {
    postPlaylist,
    patchPlaylist,
    showPlaylist,
    indexPlaylists,
    deletePlaylist,
  } from '../util/playlists_util';

export const RECEIVE_CURRENT_PLAYLIST = 'RECEIVE_CURRENT_PLAYLIST';
export const RECEIVE_ALL_PLAYLISTS = 'RECEIVE_ALL_PLAYLISTS';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const RECEIVE_PLAYLIST_ERRORS = 'RECEIVE_PLAYLIST_ERRORS';
export const RESET_PLAYLIST_ERRORS = 'RESET_PLAYLIST_ERRORS';


// export const clearPlaylistErrors = () => dispatch => (
//     dispatch(resetPlaylistErrors())
// );


export const fetchPlaylists = () => dispatch => (
    indexPlaylists()
    .then (playlists => dispatch( receiveAllPlaylists(playlists) ),
    err => (dispatch( receivePlaylistErrors(err.responseJSON) )))
);

// export const createPlaylist = (formPlaylist) => dispatch => (
//     postPlaylist(formPlaylist)
//     .then( playlist => dispatch( receiveCurrentPlaylist(playlist) ),
//     err => (dispatch( receivePlaylistErrors(err.responseJSON) )))
// );

export const createPlaylist = (defaultPlaylist) => dispatch => 
{   
    // debugger
    return (
    postPlaylist(defaultPlaylist)
    .then( playlist => dispatch( receiveCurrentPlaylist(playlist) ),
    err => (dispatch( receivePlaylistErrors(err.responseJSON) )))
)};

export const displayPlaylist = (playlistId) => dispatch => 
{   debugger
    // return console.log("THIS IS DISPLAYPLAYLIST");
    return (
    showPlaylist(playlistId)
    .then (playlist => dispatch( receiveCurrentPlaylist(playlist) ),
    err => (dispatch( receivePlaylistErrors(err.responseJSON) )))
)
};

export const editPlaylist = (playlist, playlistId) => dispatch => (
    patchPlaylist(playlist, playlistId)
    .then( playlist => dispatch( receiveCurrentPlaylist(playlist) ),
    err => (dispatch( receivePlaylistErrors(err.responseJSON) )))
);

export const removePlaylist = (playlistId) => dispatch => (
    deletePlaylist(playlistId)
    .then ( () => dispatch())
)




const receivePlaylistErrors = (errors) => ({
    type: RECEIVE_PLAYLIST_ERRORS,
    errors: errors,
});

const resetPlaylistErrors = () => ({
    type: RESET_PLAYLIST_ERRORS,
});

const receiveCurrentPlaylist = (playlist) => ({
    type: RECEIVE_CURRENT_PLAYLIST,
    playlist,
});

const receiveAllPlaylists = (playlists) => ({
    type: RECEIVE_ALL_PLAYLISTS,
    playlists,
});
