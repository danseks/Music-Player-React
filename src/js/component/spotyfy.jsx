import React, { useEffect, useState, useRef } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import PropTypes from "prop-types";

export function Songlist(props) {
	const [songs, setSongs] = useState([]);
	const [urlSong, setUrlSong] = useState("");
	const [nextSong, setNextSong] = useState("");
	const getAudioID = document.querySelector("#audioSong");
	const [pause, setPause] = useState(false);
	let test = songs[0];
	console.log(typeof test);
	const songURL = "https://assets.breatheco.de/apis/sound/";

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/all")
			.then(res => {
				return res.json();
			})
			.then(jsonSong => {
				let listOfSongs = Object.values(jsonSong)[1];
				//console.log(listOfSongs);
				setSongs(listOfSongs);
			});
	}, []);

	const trackListOfSong = () => {
		return songs.map((item, index) => (
			<button
				id={index}
				key={index.toString()}
				onClick={() => {
					setPause(false);
					setUrlSong(item.url);
					setNextSong(index);
				}}
				name={item.name}>
				{item.name}
			</button>
		));
	};

	const updateSong = () => {
		if (pause == false) {
			getAudioID.pause();
			setPause(true);
		} else {
			getAudioID.play();
			setPause(false);
		}
	};

	return (
		<>
			<div>{trackListOfSong()}</div>
			<div>
				{" "}
				<audio
					controls
					autoPlay
					key={nextSong}
					src={songURL + urlSong}
					id="audioSong"
				/>{" "}
			</div>
			<button onClick={() => updateSong()}>pausa</button>
			<button onClick={() => console.log(nextSong + 1)}> Next </button>
			<button />
		</>
	);
}

Songlist.propTypes = {
	name: PropTypes.string,
	url: PropTypes.string
};
