import React from "react"
import {graphql, StaticQuery} from "gatsby"
import BackgroundImage from 'gatsby-background-image'

const Thumbnail = (props) => {
    return (
    <StaticQuery
        query={graphql`
          query {
            images: allFile {
              edges {
                node {
                  relativePath
                  name
                  childImageSharp {
                    fluid(quality: 90, maxWidth: 200) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
    `}

        render={(data) => {
            const image = data.images.edges.find(n => {
                return n.node.relativePath.includes(props.src);
            });
            if (!image) {
                return null;
            }
            const fluid = image.node.childImageSharp.fluid;
            return (
                <BackgroundImage
                    Tag={"div"}
                    fluid={fluid}
                    style={{width: 100, height: 100, marginRight: 5}}
                />
            );
        }}
    />);
};

export default Thumbnail
