import React from "react";
import {graphql} from "gatsby";
import GalleryCard from "../components/Gallery/GalleryCard";
import Layout from "../components/layout"
import SEO from "../components/seo"
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        textAlign: 'center'
    },
    cardContainer: {
        display: 'inline-block'
    }
}));

export default ({pageContext, data}) => {
    const classes = useStyles();
    const galleries = pageContext.galleries.map(gallery => {
        let image = null;
        if (gallery.preview)
            image = data.images.edges.find(edge => gallery.preview.includes(edge.node.name));
        return ({
                city: gallery.city,
                imageFluid: image ? image.node.childImageSharp.fluid : null
            }
        );
    });

    return (
        <Layout>
            <SEO title="Home"/>
            <div className={classes.container}>
                {galleries.map(gallery => {
                    return (
                        <div key={gallery.city} className={classes.cardContainer}>
                            <GalleryCard gallery={gallery}/>
                        </div>
                    );
                })}
            </div>
        </Layout>
    )
};

export const pageQuery = graphql`
    query GalleryPreviews($previews: [String]!) {
        images: allFile(filter: {relativePath: {in: $previews}}){
            edges {
                node {
                    name
                    childImageSharp {
                        fluid(maxWidth: 600) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;