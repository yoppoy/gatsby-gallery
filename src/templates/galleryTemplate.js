import React, {useState} from "react";
import {graphql} from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import FsLightbox from 'fslightbox-react';
import ImageGrid from '../components/Gallery/ImageGrid';

export default function GalleryTemplate({pageContext, data}) {
    const [toggle, setToggle] = useState(false);
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
    const lightboxImages = images.map(image => {
        console.log(image);
        return image.childImageSharp.fluid.srcWebp
    });

    return (
        <Layout showPadder={false} style={{marginTop: 4, margin: 3}}>
            <SEO title={pageContext.city}/>
            <ImageGrid images={images} onImageClick={(index) => {
                if (imageIndex !== index)
                    setImageIndex(index);
                setToggle(!toggle)
            }}/>
            <FsLightbox
                toggle={toggle}
                sources={lightboxImages}
                slide={imageIndex + 1}
            />
        </Layout>
    );
};

export const pageQuery = graphql`
    query PageQuery($images: [String]!) {
        images: allFile(filter: {relativePath: {in: $images}}){
            edges {
                node {
                    name
                    childImageSharp {
                        sizes(maxWidth: 1500, quality: 80) {
                            ...GatsbyImageSharpSizes_withWebp
                        }
                        fluid(maxWidth: 3000, quality: 80) {
                            ...GatsbyImageSharpFluid_withWebp_noBase64
                        }
                    }
                }
            }
        }
    }
`;