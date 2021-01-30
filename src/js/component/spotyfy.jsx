import React, { useEffect, useState, useRef } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

export function Songlist() {
	const [songs, setSongs] = useState([]);
	const [urlSong, setUrlSong] = useState("");
	const [actualSong, setActualSong] = useState("");
	const [pause, setPause] = useState(false);
	const songURL = "https://assets.breatheco.de/apis/sound/";
	const audioRef = useRef();

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/all")
			.then(res => {
				return res.json();
			})
			.then(jsonSong => {
				let listOfSongs = Object.values(jsonSong)[1];
				setSongs(listOfSongs);
			});
	}, []);

	const trackListOfSong = () => {
		return songs.map((item, index) => (
			<li
				id={index}
				key={index.toString()}
				onClick={() => {
					setPause(false);
					setUrlSong(item.url);
					setActualSong(index);
				}}
				name={item.name}>
				{item.name}
			</li>
		));
	};

	const updateSong = () => {
		if (pause == false) {
			audioRef.current.pause();
			setPause(true);
		} else {
			audioRef.current.play();
			setPause(false);
		}
	};

	const nextSong = actual => {
		let initialSong = 0;
		if (actual == 21) {
			setUrlSong(songs[0].url);
			setActualSong(initialSong);
			setPause(false);
		} else {
			setUrlSong(songs[actual + 1].url);
			setActualSong(actual + 1);
			setPause(false);
		}
	};

	const previusSong = actual => {
		let finalSong = 21;
		if (actual == 0) {
			setUrlSong(songs[21].url);
			setActualSong(finalSong);
			setPause(false);
		} else {
			setUrlSong(songs[actual - 1].url);
			setActualSong(actual - 1);
			setPause(false);
		}
	};

	return (
		<>
			<audio
				controls
				autoPlay
				key={actualSong}
				src={songURL + urlSong}
				ref={audioRef}
				className="d-none"
			/>
			<Container>
				<Card className="mx-auto mt-5">
					<Card.Body>
						<Card.Title>
							<Row className="row-player">
								<Col>
									<Button
										onClick={() => previusSong(actualSong)}
										variant="default"
										className="uvs-left">
										<i className="fa fa-backward ml-4" />
									</Button>
								</Col>
								<Col>
									{" "}
									<Button
										onClick={() => updateSong()}
										variant="default"
										className="uvs-left">
										<i className="fa fa-play ml-3" />
									</Button>
								</Col>
								<Col>
									<Button
										onClick={() => nextSong(actualSong)}
										variant="default"
										className="uvs-left">
										<i className="fa fa-forward ml-3" />
									</Button>
								</Col>
							</Row>
						</Card.Title>
					</Card.Body>
					<progress max="100" value="100" />
					<ol className="list-group">{trackListOfSong()}</ol>
				</Card>
			</Container>{" "}
		</>
	);
}
