import React, { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import PropTypes from "prop-types";

export const Audio = () => {

    return (
        <audio controls
            src={props.url}
            onClick={props.onMyClick()}
        >

        </audio>
    )
}
Audio.propTypes = {
    src: PropTypes.string,
    onMyClick: PropTypes.any
};