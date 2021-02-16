import React from "react";
import { Link } from "gatsby";
import { Navigation } from "..";

// Styles
import "../../../styles/app.css";
import "../../../styles/semantic-ui/image.css";

const Footer = ({ site }) => {
    return (
        <footer className="site-foot">
            <div className="site-foot-nav container">
                <div className="site-foot-nav-left">
                    <Link to="/">
                        <img
                            className="site-footer"
                            src="/images/javaadpatel_logo_gray_light.svg"
                            alt="Javaad Patel"
                        />
                    </Link>{" "}
                    © {new Date().getFullYear()}
                </div>
                <div className="site-foot-nav-right">
                    <Navigation
                        data={site.navigation}
                        navClass="site-foot-nav-item"
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
