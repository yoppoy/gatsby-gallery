import React from "react";
import {graphql, Link, useStaticQuery} from "gatsby";
import Thumbnail from "../components/thumbnail";

import Layout from "../components/layout"
import SEO from "../components/seo"

const GalleriesPreview = () => {
    const data = useStaticQuery(QueryAllGalleries);
    const edges = data.allMarkdownRemark.edges;

    return (
        <div>
            {edges.map(edge => {
                const gallery = edge.node.frontmatter;
                return (
                    <div style={{marginBottom: 20}}>
                        <Link to={`/galleries/${gallery.city.toLowerCase()}`} key={gallery.city}>
                            <h3 style={{marginBottom: 2}}>{gallery.city}</h3>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {gallery.images.map(image => {
                                    let index = image.image.lastIndexOf('/');
                                    let name = (index > -1) ? image.image.substring(index + 1) : image.image;
                                    console.log(name);
                                    return (<Thumbnail style={{margin: 20}} key={name} src={name}/>);
                                })}
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>);
};

const IndexPage = () => {
    return (
        <Layout>
            <SEO title="Home"/>
            <h1>Galleries</h1>
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