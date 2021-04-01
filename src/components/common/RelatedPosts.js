import React from "react";
import _ from "lodash";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";
import head from "lodash/fp/head";

import { Grid } from "semantic-ui-react";
import { PostCard } from ".";

import "../../styles/semantic-ui/grid.css";

const RelatedPosts = ({ allPosts, post }) => {
    let relatedPosts;
    let relatedPostsLimit = 2;

    const findRelatedArticles = () => {
        const primaryTag = post.primary_tag.slug;
        const secondaryTag = flow(
            filter(function (p) {
                return p.slug !== primaryTag;
            }),
            head
        )(post.tags)?.slug;

        const primaryRelatedArticles = flow(
            filter(function ({ node }) {
                return (
                    node.tags.some(function ({ slug }) {
                        return slug == primaryTag || slug == secondaryTag;
                    }) && node.id !== post.id
                );
            })
        )(allPosts);

        relatedPosts = _.map(
            _.take(primaryRelatedArticles, relatedPostsLimit),
            (article, key) => {
                return article.node;
            }
        );
    };

    findRelatedArticles();

    const renderPosts = (relatedPosts) => {
        return !_.isEmpty(relatedPosts) ? (
            <Grid
                inverted
                container
                stackable
                columns="equal"
                divided
                className="related-articles-grid"
            >
                <Grid.Row textAlign="center">
                    <Grid.Column>
                        <strong>You might also enjoy</strong>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row textAlign="center">
                    {_.map(relatedPosts, (post) => {
                        return (
                            <Grid.Column>
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    views={null}
                                />
                            </Grid.Column>
                        );
                    })}
                </Grid.Row>
            </Grid>
        ) : (
            <></>
        );
    };

    return renderPosts(relatedPosts);
};

export default RelatedPosts;
