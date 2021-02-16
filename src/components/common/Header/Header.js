import React from "react";
import { Link } from "gatsby";
import { Image } from "semantic-ui-react";
import { Navigation } from "..";
import Header__SocialIcons from "./Header__SocialIcons";

// Styles
import "../../../styles/app.css";
import "../../../styles/semantic-ui/image.css";

const Header = ({ site, isHome }) => {
    return (
        <header
            className="site-head"
            style={{
                ...(site.cover_image && {
                    backgroundImage: `url(${site.cover_image})`,
                }),
            }}
        >
            <div className="container">
                <div className="site-mast">
                    <div className="site-mast-left">
                        {!isHome ? (
                            <Link to="/">
                                <h3 className="site-title">{site.title}</h3>
                                {/* <img
                                    className="site-logo"
                                    src={site.logo}
                                    alt={site.title}
                                /> */}
                            </Link>
                        ) : null}
                    </div>
                    {!isHome ? (
                        <div className="site-mast-right">
                            <Header__SocialIcons
                                anchorClassName="site-nav-item"
                                imageClassName="site-nav-icon"
                            />
                        </div>
                    ) : null}
                </div>
                {isHome ? (
                    <div className="site-banner">
                        <h1 className="site-banner-title">
                            <Image
                                src="/images/profile.jpg"
                                size="medium"
                                circular
                                centered
                                bordered
                            />
                            Hi!
                        </h1>
                        <p className="site-banner-desc">
                            My name is Javaad Patel. I'm a software engineer
                            specializing in cloud architecture, identity
                            management and distributed systems.
                        </p>
                        <br />
                        <div>
                            <Header__SocialIcons
                                anchorClassName="home-social-item"
                                imageClassName="home-social-icon"
                            />
                        </div>
                    </div>
                ) : null}
                <nav className="site-nav">
                    <div className="site-nav-left">
                        {/* The navigation items as setup in Ghost */}
                        <Navigation
                            data={site.navigation}
                            navClass="site-nav-item"
                        />
                    </div>
                    {/* <div className="site-nav-right">
                    <Link
                        className="site-nav-button"
                        to="/about"
                    >
                        About
                    </Link>
                </div> */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
