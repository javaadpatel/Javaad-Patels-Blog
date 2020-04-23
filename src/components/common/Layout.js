import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { Image, Label } from "semantic-ui-react";
import { SubscribeForm } from "../../components/common";

import { Navigation } from ".";
import config from "../../utils/siteConfig";

// Styles
import "../../styles/app.css";
import "../../styles/semantic-ui/image.css";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node;
    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">
                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
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
                                            <h3 className="site-title">
                                                {site.title}
                                            </h3>
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
                                        <a
                                            href="https://www.linkedin.com/in/javaadpatel/"
                                            className="site-nav-item"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div>
                                                <img
                                                    className="site-nav-icon"
                                                    src="/images/icons/linkedin.png"
                                                    alt="LinkedIn"
                                                />
                                            </div>
                                        </a>
                                        <a
                                            href="https://github.com/javaadpatel"
                                            className="site-nav-item"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div>
                                                <img
                                                    className="site-nav-icon"
                                                    src="/images/icons/github.png"
                                                    alt="Github"
                                                />
                                            </div>
                                        </a>
                                        <a
                                            href="mailto:javaadpatel@gmail.com?subject=Interested in your work"
                                            className="site-nav-item"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div>
                                                <img
                                                    className="site-nav-icon"
                                                    src="/images/icons/gmail.png"
                                                    alt="Gmail"
                                                />
                                            </div>
                                        </a>
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
                                        My name is Javaad Patel. I'm a software
                                        developer specializing in cloud
                                        architecture, identity management and
                                        distributed systems..
                                    </p>
                                    <br />
                                    <div>
                                        <a
                                            href="https://www.linkedin.com/in/javaadpatel/"
                                            className="home-social-item"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div>
                                                <img
                                                    className="home-social-icon"
                                                    src="/images/icons/linkedin.png"
                                                    alt="LinkedIn"
                                                />
                                            </div>
                                        </a>
                                        <a
                                            href="https://github.com/javaadpatel"
                                            className="home-social-item"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div>
                                                <img
                                                    className="home-social-icon"
                                                    src="/images/icons/github.png"
                                                    alt="Github"
                                                />
                                            </div>
                                        </a>
                                        <a
                                            href="mailto:javaadpatel@gmail.com?subject=Interested in your work"
                                            className="home-social-item"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div>
                                                <img
                                                    className="home-social-icon"
                                                    src="/images/icons/gmail.png"
                                                    alt="Gmail"
                                                />
                                            </div>
                                        </a>
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

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                        <SubscribeForm />
                    </main>
                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">{site.title}</Link> ©{" "}
                                {new Date().getFullYear()} &mdash; Published
                                with{" "}
                                <a
                                    className="site-foot-nav-item"
                                    href="https://ghost.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ghost
                                </a>
                            </div>
                            <div className="site-foot-nav-right">
                                <Navigation
                                    data={site.navigation}
                                    navClass="site-foot-nav-item"
                                />
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: { eq: "ghost-icon.png" }) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={(data) => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
