import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'
import axios from "axios";
import _ from 'lodash';
const { googleAnalyticsBaseUrl } = require('../utils/siteConfig')


/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges;

    const [pageViews, setPageViews] = useState([]);

    /**
     * Fetches google analytics page views on page load
     */
    useEffect(() => {

        async function fetchGooglePageViews() {
            try{
                const response = await axios
                    .get(`${googleAnalyticsBaseUrl}/.netlify/functions/server/getViews`, {
                        timeout: 1000 //ms
                    });
                
                if (response.status == 200){
                    var pageViewsArray = response.data;
                    var pageViews = pageViewsArray.map(function(p) {
                        return {
                            path: p[0],
                            views: p[1]
                        }
                    })
                    setPageViews(pageViews)
                }
            }catch(e){
                console.error(`Error fetching page views. Error: ${e}`)
            }
        }

        if (pageViews.length == 0) {
            fetchGooglePageViews();
        }
    }, [pageViews]);

    /**
     * Extracts the page views from the pageViews colletion
     * @param {*} pagePath the current post's page path
     */
    const getPageViewsForPage = (pagePath) => {
        pagePath = `/${pagePath}/`;
        var pageViewElement = _.find(pageViews, ['path', pagePath]);
        if (pageViewElement !== undefined)
            return pageViewElement.views;
        
        return null;
    }

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container">
                <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} views={getPageViewsForPage(node.slug)} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    ) 
}

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
