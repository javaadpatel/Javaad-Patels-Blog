import React, { useRef } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import TalkyardCommentsIframe from "@debiki/gatsby-plugin-talkyard";
import { Grid, Segment, Rail, Sticky, Ref } from "semantic-ui-react";
import "../styles/semantic-ui/grid.css";
import "../styles/semantic-ui/button.css";
import "../styles/semantic-ui/rail.css";
import "../styles/semantic-ui/sticky.css";
import "../styles/semantic-ui/container.css";
import { ScrollArrow, ShareButtons, RelatedPosts } from "../components/common";
import _ from "lodash";



import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import { useEffect } from "react";

import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import BuyMeACoffee from "../components/common/BuyMeACoffee";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */

const Post = ({ data, location }) => {
    const stickyRef = useRef(null);
    const post = data.ghostPost;
    const allPosts = data.allGhostPost.edges;
    const postShareUrl = location.href;
    const postShareTitle = "Found this amazing article, check it out";

    useEffect(() => {
        // call the highlightAll() function to style our code blocks
        Prism.highlightAll();
    });

    /*Load Table of Contents*/
    useEffect(() => {
        /*https://stackoverflow.com/a/34425083*/
        const script = document.createElement("script");
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.10.0/tocbot.min.js";
        script.async = false;

        script.onload = () => {
            {
                tocbot.init({
                    tocSelector: ".toc",
                    contentSelector: ".content-body",
                    hasInnerContainers: true,
                    collapseDepth: 6,
                });
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.10.0/tocbot.css"
                ></link>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        {post.feature_image ? (
                            <figure className="post-feature-image">
                                <img
                                    src={post.feature_image}
                                    alt={post.title}
                                />
                            </figure>
                        ) : null}
                        <section className="post-full-content">
                            <h1 className="content-title">{post.title}</h1>
                            <Grid centered columns={1} stackable>
                                <Grid.Column>
                                    <Ref innerRef={stickyRef}>
                                        <>
                                            <section
                                                className="content-body load-external-scripts"
                                                dangerouslySetInnerHTML={{
                                                    __html: post.html,
                                                }}
                                            />

                                            <ScrollArrow />

                                            <Rail position="right">
                                                <Sticky
                                                    offset={100}
                                                    context={stickyRef}
                                                >
                                                    <Segment>
                                                        <h3 className="content">
                                                            Table of Contents
                                                        </h3>
                                                        <aside class="toc-container">
                                                            <div class="toc"></div>
                                                        </aside>
                                                    </Segment>
                                                </Sticky>
                                            </Rail>
                                        </>
                                    </Ref>
                                </Grid.Column>
                            </Grid>
                        </section>
                        <ShareButtons
                            postShareTitle={postShareTitle}
                            postShareUrl={postShareUrl}
                        />
                        <TalkyardCommentsIframe />
                        <RelatedPosts
                            allPosts = {allPosts}
                            post= {post}
                        />
                        <BuyMeACoffee />
                    </article>
                </div>
            </Layout>
        </>
    );
};

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            limit: 10
            skip: 0
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
