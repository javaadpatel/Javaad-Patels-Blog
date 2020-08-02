import React from "react";
import { Form, Button, Card, Container, Grid, Icon } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "../../styles/semantic-ui/form.css";
import "../../styles/semantic-ui/grid.css";
import "../../styles/semantic-ui/button.css";
import "../../styles/semantic-ui/card.css";
import "../../styles/semantic-ui/container.css";

const SubscribeForm = () => {
    const serialize = function (form) {
        // Setup our serialized data
        var serialized = "";

        // Loop through each field in the form
        for (var i = 0; i < form.elements.length; i++) {
            var field = form.elements[i];

            // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
            if (
                !field.name ||
                field.disabled ||
                field.type === "file" ||
                field.type === "reset" ||
                field.type === "submit" ||
                field.type === "button"
            )
                continue;

            // Convert field data to a query string
            if (
                (field.type !== "checkbox" && field.type !== "radio") ||
                field.checked
            ) {
                serialized +=
                    "&" +
                    encodeURIComponent(field.name) +
                    "=" +
                    encodeURIComponent(field.value);
            }
        }

        return serialized;
    };

    const displayMailChimpStatus = function (data) {
        console.log(data);
        // Get the status message content area
        var mcStatus = document.querySelector(".mc-status");
        if (!mcStatus) return;

        // Update our status message
        mcStatus.innerHTML = data.msg;

        // If error, add error class
        if (data.result === "error") {
            mcStatus.classList.remove("success-message");
            mcStatus.classList.add("error-message");
            return;
        }

        // Otherwise, add success class
        mcStatus.classList.remove("error-message");
        mcStatus.classList.add("success-message");
    };

    const submitMailChimpForm = function (form) {
        console.log(form);
        // Get the Submit URL
        var url = form.getAttribute("action");
        url = url.replace("/post?u=", "/post-json?u=");
        url += serialize(form) + "&c=displayMailChimpStatus";

        // Create script with url and callback (if specified)
        var script = window.document.createElement("script");
        script.src = url;

        // Insert script tag into the DOM (append to <head>)
        var ref = window.document.getElementsByTagName("script")[0];
        ref.parentNode.insertBefore(script, ref);

        // After the script is loaded (and executed), remove it
        script.onload = function () {
            this.remove();
        };
    };

    const onSubmit = (event) => {};

    return (
        <Container className="subscription-form-card">
            <Grid className="centered" padded>
                <Card fluid className="subscription-form-card">
                    <Card.Content>
                        <Container>
                            <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                        </Container>
                        <br />
                        <Card.Header>Subscribe to keep reading awesome articles.</Card.Header>
                        <Card.Description>
                            <Grid columns={1} padded="horizontally">
                                <Grid.Column>
                                    <Form
                                        action="https://javaadpatel.us18.list-manage.com/subscribe/post?u=8e34a51ba7ad1ef1d8ecf5b2e&amp;id=ea72c8b591"
                                        method="post"
                                        id="mc-embedded-subscribe-form"
                                        name="mc-embedded-subscribe-form"
                                        // class="validate"
                                        target="_blank"
                                        onSubmit={onSubmit}
                                    >
                                        <Form.Field>
                                            <input
                                                placeholder="First Name"
                                                name="FNAME"
                                                id="mce-FNAME"
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <input
                                                type="email"
                                                name="EMAIL"
                                                id="mce-EMAIL"
                                                placeholder="Enter Email Address"
                                            />
                                        </Form.Field>
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: "-5000px",
                                            }}
                                            aria-hidden="true"
                                        >
                                            <input
                                                type="text"
                                                name="b_f2d244c0df42a0431bd08ddea_aeaa9dd034"
                                                tabIndex="-1"
                                            />
                                        </div>
                                        <div className="mc-status"></div>
                                        <Button
                                            fluid
                                            type="submit"
                                            color="black"
                                            id="mc-embedded-subscribe"
                                        >
                                            Subscribe Now
                                        </Button>
                                    </Form>
                                </Grid.Column>
                            </Grid>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Grid>
        </Container>
    );
};

export default SubscribeForm;
