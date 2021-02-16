import React from "react";

const Header__SocialIcons = ({ anchorClassName, imageClassName }) => {
    const iconData = [
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/javaadpatel/",
            target: "_blank",
            alt: "LinkedIn",
            src: "/images/icons/linkedin.png",
        },
        {
            name: "Github",
            href: "https://github.com/javaadpatel",
            target: "_blank",
            alt: "Github",
            src: "/images/icons/github.png",
        },
        {
            name: "Gmail",
            href:
                "mailto:javaadpatel@gmail.com?subject=Interested in your work",
            target: "_blank",
            alt: "Gmail",
            src: "/images/icons/gmail.png",
        },
        {
            name: "Twitter",
            href: "https://twitter.com/javaad_patel",
            target: "_blank",
            alt: "Twitter",
            src: "/images/icons/twitter.png",
        },
    ];

    return iconData.map((iconData) => {
        return (
            <a
                href={iconData.href}
                className={anchorClassName}
                target={iconData.target}
                rel="noopener noreferrer"
            >
                <div>
                    <img
                        className={imageClassName}
                        src={iconData.src}
                        alt={iconData.alt}
                    />
                </div>
            </a>
        );
    });
};

export default Header__SocialIcons;
