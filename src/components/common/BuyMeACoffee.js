import React, { useEffect } from "react";
import Helmet from "react-helmet";

const BuyMeACoffee = ({}) => {
    /*Load BuyMeACoffeeWidget*/
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
        script.async = false;

        //Call window on load to show the image
        script.onload = () => {
            var evt = document.createEvent("Event");
            evt.initEvent("DOMContentLoaded", false, false);
            if (typeof window !== `undefined`) {
                window.dispatchEvent(evt);
            }
        };
        document.body.appendChild(script);

        return () => {
            const bmcButton = document.getElementById("bmc-wbtn");
            bmcButton.remove();
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <Helmet>
                <script
                    async={false}
                    data-name="BMC-Widget"
                    data-cfasync="false"
                    src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
                    data-id="javaad"
                    data-description="Support me on Buy me a coffee!"
                    data-message=""
                    data-color="#FFDD00"
                    data-position="Right"
                    data-x_margin="10"
                    data-y_margin="65"
                ></script>
            </Helmet>
        </>
    );
};

export default BuyMeACoffee;
