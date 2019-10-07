import React from "react";
import {graphql} from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from "gatsby-image";
import {makeStyles} from "@material-ui/core";
import '../styles/image-grid.css';

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex", flexDirection: "row"
    }
}));

export default function GalleryTemplate({pageContext, data}) {
    const classes = useStyles();

    console.log(classes);
    return (
        <Layout>
            <SEO title={pageContext.city}/>
            <div className="grid-gallery">
                {data.images.edges.map(edge => {
                    console.log(edge.node.childImageSharp.sizes.src);
                    let ratio = edge.node.childImageSharp.sizes.aspectRatio;
                    return (<a key={edge.node.name} className={"grid-image-container"} style={{width: `${ratio * 400}px`, flexGrow:ratio * 400}}>
                        <Img className="grid-image" sizes={edge.node.childImageSharp.sizes}/>
                    </a>);
                })}
            </div>
        </Layout>
    );
};

export const pageQuery = graphql`
    query PageQuery($images: [String!]!) {
        images: allFile(filter: {relativePath: {in: $images}}, orderBy: DESC){
            edges {
                node {
                    name
                    childImageSharp {
                        sizes(maxWidth: 2000) {
                            ...GatsbyImageSharpSizes
                        }
                    }
                }
            }
        }
    }
`;