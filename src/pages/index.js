import React from "react";
import {graphql, useStaticQuery} from "gatsby";
import GalleryCard from "../components/Gallery/Card/GalleryCard";
import Layout from "../components/layout"
import SEO from "../components/seo"
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {},
}));

const GalleriesPreview = () => {
    const data = useStaticQuery(QueryAllGalleries);
    const classes = useStyles();
    const edges = data.allMarkdownRemark.edges;

    return (
        <div className={classes.container}>
            {edges.map(edge => {
                const gallery = edge.node.frontmatter;
                return (
                    <div style={{display: 'inline-block'}}>
                        <GalleryCard key={gallery.city} gallery={gallery}/>
                    </div>
                );
            })}
        </div>);
};

const IndexPage = () => {
    return (
        <Layout>
            <SEO title="Home"/>
            <GalleriesPreview/>
        </Layout>
    )
};

export default IndexPage;

const QueryAllGalleries = graphql`
    query AllGalleries {
        allMarkdownRemark(
            limit: 1000,
            sort: { fields: [frontmatter___city], order: DESC }
        ) {
            totalCount
            edges {
                node {
                    frontmatter {
                        city
                        images {
                            image
                        }
                    }
                }
            }
        }
    }
`;