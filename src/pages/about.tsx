import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Icon from "../img/tamagram.jpg";
import githubIcon from "../svg/github-icon.svg";
import twitterIcon from "../svg/twitter.svg";

export default class About extends React.Component {
    render() {
        return (
            <Container fluid>
                <h1>About</h1>
                <Row>
                    <div className="mx-4">
                        <img src={Icon} className="rounded" />
                    </div>
                    <div>
                        <a href="https://twitter.com/tamagrm"><h4 className="mx-4 my-1"><img src={twitterIcon}></img> Twitter</h4></a><br />
                        <a href="https://github.com/tamagram"><h4 className="mx-4 my-1"><img src={githubIcon}></img> GitHub</h4></a>
                    </div>
                </Row>
            </Container>
        );
    }
}