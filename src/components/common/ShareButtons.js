import React from "react";
import {
    TwitterShareButton,
    TwitterIcon,
    RedditShareButton,
    RedditIcon,
    EmailShareButton,
    EmailIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from "react-share";

const ShareButtons = ({postShareUrl, postShareTitle}) => {

    const twitterHandle = "@javaadpatel";
    const siteUrl = "https://javaadpatel.com";

    return (
        <div
        style={{
            float: "right",
            paddingBottom: "1em",
            fontFamily: "Georgia, Times, serif",
        }}
    >
        Share this post on {"   "}
        <TwitterShareButton
            url={postShareUrl}
            title={postShareTitle}
            related={[twitterHandle]}
        >
            <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton
            url={postShareUrl}
            title={postShareTitle}
            source={siteUrl}
        >
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
    )
}

export default ShareButtons;