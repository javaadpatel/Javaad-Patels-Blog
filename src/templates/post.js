import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import TalkyardCommentsIframe from "@debiki/gatsby-plugin-talkyard";
import {Segment, Header, Icon} from "semantic-ui-react";
import {
    TwitterShareButton, 
    TwitterIcon, 
    RedditShareButton, 
    RedditIcon, 
    EmailShareButton, 
    EmailIcon,
    LinkedinShareButton,
    LinkedinIcon
} from "react-share";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import { useEffect } from "react";

import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */

const Post = ({ data, location }) => {
    const post = data.ghostPost;
    const postShareUrl = location.href;
    const postShareTitle = 'Found this amazing article, check it out';

    useEffect(() => {
        // call the highlightAll() function to style our code blocks
        Prism.highlightAll();
    });

    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
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

                            {/* The main post content */}
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                        </section>
                        <div style={{float:'right', paddingBottom: '1em', fontFamily: 'Georgia, Times, serif'}}>
                            Share this post on {"   "}
                            <TwitterShareButton
                                url={postShareUrl}
                                title={postShareTitle}
                                related={["@javaad_patel"]}
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <LinkedinShareButton url={postShareUrl} title={postShareTitle} source={"https://javaadpatel.com"} >
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                            <RedditShareButton
                                url={postShareUrl}
                                title={postShareTitle}
                                windowWidth={660}
                                windowHeight={460}
                            >
                                <RedditIcon size={32} round />
                            </RedditShareButton>
                            <EmailShareButton
                                url={postShareUrl}
                                subject={postShareTitle}
                                body="body"
                            >
                                <EmailIcon size={32} round />
                            </EmailShareButton>
                        </div>
                        <TalkyardCommentsIframe />
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
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`;
