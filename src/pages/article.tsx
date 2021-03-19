import React from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import ReactMarkdown from "react-markdown";


export default class Article extends React.Component {

    articleDirname: string;
    data: string | undefined;
    state: { data?: string | undefined }

    async fetchMDdata(articleDirname: string) {
        try {
            return (await axios.get("https://raw.githubusercontent.com/tamagram/blog/master/src/articles/" + articleDirname + "/index.md"))
        } catch (error) {
            throw error.response.status
        }
    }

    constructor(props: { match: { params: { articleDirname: string; }; }; }) {
        super(props);
        this.state = { data: undefined }
        this.articleDirname = props.match.params.articleDirname
    }
    componentDidMount() {
        if (this.state.data === undefined) {
            (async () => {
                try {
                    await this.fetchMDdata(this.articleDirname).then(res => {
                        // console.log(res.data);
                        // console.log(typeof (res.data));
                        this.setState({ data: res.data as string })
                    });
                } catch (e) {
                    //...handle the error...
                }
            })();
        }
    }
    render() {
        return (
            <Container fluid>
                <h1>{this.articleDirname.split("_")[1]}</h1>
                <h5>{this.articleDirname.split("_")[0]}</h5>
                <ReactMarkdown>
                    {"---"}
                    {this.state.data === undefined ? "___Loading...___" : this.state.data}
                </ReactMarkdown>
            </Container>
        );
    }
}

