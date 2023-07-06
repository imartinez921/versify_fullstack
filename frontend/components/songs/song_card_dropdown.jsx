import React, { useState, useEffect, useRef } from "react";

import SongCardSubmenu from "./song_card_submenu";
import SongCardDropdownItem from "./song_card_dropdown_item";


const SongCardDropdown = ({
    currentItem,
    playlists,
    source,
    selectedSong,
    updateSongCardDropdownState,
    updateDropdownPosition,
    items,
    depthLevel,
    dropdownPosition,
    removePlaylisted,
    createNewPlaylisted,
    displayPlaylist,
}) => {
    console.log("RENDERED");

    // Set local state for SongCardSubmenu
    let dropdownRef = useRef();
    const [submenuState, setSubmenuState] = useState({ isOpen: false });

    // Add event listeners when menu is open; remove when menu is closed
    useEffect(() => {
        const handler = (event) => {
            if (
                submenuState.isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)
            ) {
                updateSongCardDropdownState({ isOpen: false });
                setSubmenuState({ isOpen: false });
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener when component unmounts
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [submenuState]);

    // Relocate dropdown when SongCard changes
    useEffect(() => {
        console.log("SHIFTED");
    }, [dropdownPosition]);

    const toggleSubmenuAndPlaceDropdown = (e) => {
        e.preventDefault();
        setSubmenuState({ isOpen: !submenuState.isOpen });
    };

    return (
        <div 
            // id="song-card-dropdown"
            className="song-card-dropdown dropdown-item"
            data-dropdown
            ref={dropdownRef}
            style={{
                position: 'fixed',
                left: `calc(${dropdownPosition.left}px - 175px)`,
                top: `${dropdownPosition.top}px`,
            }}
        >
            {items.map((item, index) =>
                item.submenu ? (
                    // If a submenu exists, create button for submenu title and pass submenu to SongCardSubmenu
                    <>
                        <button
                            className="song-card-dropdown-item"
                            key={`${selectedSong.playlistedId}+${depthLevel}+${item.title}+"btn"`}
                            onClick={toggleSubmenuAndPlaceDropdown}
                        >
                            {item.title}{" "}
                            <span key={`${selectedSong.playlistedId}`}>
                                &raquo;
                            </span>
                        </button>
                        <SongCardSubmenu
                            key={`${selectedSong.playlistedId}+${depthLevel}+${item.title}+"subm"`}
                            source={source}
                            selectedSong={selectedSong}
                            submenus={item.submenu}
                            submenuState={submenuState}
                            depthLevel={depthLevel}
                            dropdownPosition={dropdownPosition}
                            updateSongCardDropdownState={
                                updateSongCardDropdownState
                            }
                        />
                    </>
                ) : (
                    <SongCardDropdownItem // Else, create just a button
                        key={`${selectedSong.playlistedId}+${item.title}+${depthLevel}+"no-subm"`}
                        currentItem={currentItem}
                        playlists={playlists}
                        selectedSong={selectedSong}
                        updateSongCardDropdownState={
                            updateSongCardDropdownState
                        }
                        item={item}
                        depthLevel={depthLevel}
                        dropdownPosition={dropdownPosition}
                        removePlaylisted={removePlaylisted}
                        createNewPlaylisted={createNewPlaylisted}
                        displayPlaylist={displayPlaylist}
                    />
                )
            )}
        </div>
    );
};

export default SongCardDropdown;