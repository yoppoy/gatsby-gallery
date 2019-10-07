import React, {useState} from "react";
import {graphql} from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from "gatsby-image";
import FsLightbox from 'fslightbox-react';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
        container: {
            display: "flex", flexDirection: "row"
        },
        gridGallery: {
            display: "flex",
            flexWrap: "wrap",
            '&::after': {
                content: '',
                flexGrow: 999999999
            }
        },
        gridImageContainer: {
            position: "relative",
            cursor: "pointer",
            margin: 5,
        },
        gridPadder: {
            display: "block"
        },
        gridImage: {
            position: "absolute",
            top: 0,
            width: "100%",
            verticalAlign: "bottom"
        }
    }
));

export default function GalleryTemplate({pageContext, data}) {
    const classes = useStyles();
    const [toggler, setToggler] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    let images = [];
    data.images.edges.forEach((edge) => {
        /* Sorting according to md file order */
        for (let a = 0; a < pageContext.images.length; a++) {
            if (pageContext.images[a].includes(edge.node.name)) {
                images[a] = edge.node;
                break;
            }
        }
    });
    const lightboxImages = images.map(image => image.childImageSharp.fluid.src);

    return (
        <Layout>
            <SEO title={pageContext.city}/>
            <div className={classes.gridGallery}>
                {images.map((image, index) => {
                    console.log(image);
                    let ratio = image.childImageSharp.sizes.aspectRatio;
                    return (
                        <div
                            key={image.name} className={classes.gridImageContainer}
                            style={{width: `${ratio * 400}px`, flexGrow: ratio * 400}}
                            onClick={() => {
                                console.log("Setting : ", index, !toggler);
                                if (imageIndex !== index)
                                    setImageIndex(index);
                                setToggler(!toggler)
                            }}>
                            <Img className={classes.gridImage} sizes={image.childImageSharp.sizes}/>
                        </div>);
                })}
                <FsLightbox
                    toggler={toggler}
                    sources={lightboxImages}
                    slide={imageIndex + 1}
                />
            </div>
        </Layout>
    );
};

export const pageQuery = graphql`
    query PageQuery($images: [String!]!) {
        images: allFile(filter: {relativePath: {in: $images}}){
            edges {
                node {
                    name
                    childImageSharp {
                        sizes(maxWidth: 1000) {
                            ...GatsbyImageSharpSizes
                        }
                        fluid(maxWidth: 3000, quality: 80) {
                            src
                        }
                    }
                }
            }
        }
    }
`;