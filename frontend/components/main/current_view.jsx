import React from "react";

import HomeContainer from '../home/home_container.jsx'
import PlaylistShowContainer from "../playlists/playlist_show_container";

const CurrentView = (props) => {

    console.log('CURRENTitem PROPS', props);

    const currentViewType = () => {
        const { path,
            params,
            currentUser,
            history,
        } = props;

        switch (path) {
            case "/home":
                return <HomeContainer 
                    params={params} history={history}/>;
            case "/playlist/:id":
                return <PlaylistShowContainer
                    params={params} currentUser={currentUser} history={history}/>;
            default:
                return <HomeContainer 
                    params={params} history={history}/>;
        }
    }


    return (
        <>
            { currentViewType() }
        </>
    )

}

export default CurrentView;