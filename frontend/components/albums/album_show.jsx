import React, { useEffect, useRef } from "react";

import AlbumHeader from "./album_header";
import AlbumMenuBar from "./album_menu_bar";
import SongIndex from "../songs/song_index";

const AlbumShow = ({
	currentAlbum,
	tracks,
	playlists,
	urlParams,
	history,
	currentUser,
	isPlaying,
	currentQueueSource,
	source,
	songCardDropdownItems,
	displayAlbum,
	toPlayAlbum,
	toPushPlay,
	toTogglePlay,
	clearCurrent,
}) => {
	useEffect(() => {
		displayAlbum(urlParams.id);

		const rendered = document.getElementById("album-show");
		rendered ? rendered.scrollTo(0, 0) : null;

		return () => clearCurrent();
	}, [urlParams]); // Will run whenever urlParams.id changes, otherwise ArtistShow doesn't re-render

	const albumShowRef = useRef();

	const albumShow = (
		<div className="album-show" ref={albumShowRef}>
			<div className="album-header">
				<AlbumHeader album={currentAlbum} history={history} />
			</div>
			<div className="album-menu">
				<AlbumMenuBar
					currentUser={currentUser}
					isPlaying={isPlaying}
					currentQueueSource={currentQueueSource}
					tracks={tracks}
					playlists={playlists}
					history={history}
					toPlayAlbum={toPlayAlbum}
					toPushPlay={toPushPlay}
					toTogglePlay={toTogglePlay}
				/>
			</div>
			<SongIndex
				currentUser={currentUser}
				songs={tracks}
				history={history}
				source={source}
				songCardDropdownItems={songCardDropdownItems}
				currentViewRef={albumShowRef}
			/>
		</div>
	);
	return currentAlbum.albumPhotoUrl ? albumShow : null;
};

export default AlbumShow;
