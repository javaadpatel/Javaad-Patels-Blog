import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";
import axios from "axios";
import _ from "lodash";
const { googleAnalyticsBaseUrl } = require("../utils/siteConfig");

/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */
const Tag = ({ data, location, pageContext }) => {
    const tag = data.ghostTag;
    const posts = data.allGhostPost.edges;
    // const [pageViews, setPageViews] = useState([]);

    /**
     * Fetches google analytics page views on page load
     */
    // useEffect(() => {
    //     async function fetchGooglePageViews() {
    //         try {
    //             const response = await axios.get(
    //                 `${googleAnalyticsBaseUrl}/.netlify/functions/server/getViews`,
    //                 {
    //                     timeout: 5000, //ms
    //                 }
    //             );

    //             if (response.status == 200) {
    //                 var pageViewsArray = response.data;
    //                 var pageViews = pageViewsArray.map(function (p) {
    //                     return {
    //                         path: p[0],
    //                         views: p[1],
    //                     };
    //                 });
    //                 setPageViews(pageViews);
    //             }
    //         } catch (e) {
    //             console.error(`Error fetching page views. Error: ${e}`);
    //         }
    //     }

    //     if (pageViews.length == 0) {
    //         fetchGooglePageViews();
    //     }
    // }, [pageViews]);

    /**
     * Extracts the page views from the pageViews colletion
     * @param {*} pagePath the current post's page path
     */
    // const getPageViewsForPage = (pagePath) => {
    //     pagePath = `/${pagePath}/`;
    //     var pageViewElement = _.find(pageViews, ["path", pagePath]);
    //     if (pageViewElement !== undefined) return pageViewElement.views;

    //     return null;
    // };

    return (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout>
                <div className="container">
                    <header className="tag-header">
                        <h1>{tag.name}</h1>
                        {tag.description ? <p>{tag.description}</p> : null}
                    </header>
                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    );
};

Tag.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
};

export default Tag;

export const pageQuery = graphql`
    query GhostTagQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
