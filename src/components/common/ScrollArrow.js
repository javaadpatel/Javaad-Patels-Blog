import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import "../../styles/scrollarrow.css";

const ScrollArrow = () => {
    const [showScroll, setShowScroll] = useState(false);
    const yOffset = 800;

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > yOffset) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= yOffset) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", checkScrollTop);

    return (
        <FontAwesomeIcon
            icon={faArrowCircleUp}
            size="2x"
            className="scrollTop"
            onClick={scrollTop}
            style={{ height: 40, display: showScroll ? "flex" : "none" }}
        />
    );
};

export default ScrollArrow;
