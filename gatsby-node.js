const path = require("path");

exports.createPages = async ({graphql, actions, reporter}) => {
    const {createPage} = actions;
    const result = await graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                city
                images {
                  image
                }
                location
              }
            }
          }
        }
      }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        reporter.panicOnBuild(JSON.stringify(result.errors));
        return
    }

    const GalleryTemplate = path.resolve(`src/templates/galleryTemplate.js`);
    result.data.allMarkdownRemark.edges.forEach(({node}) => {
        const url = `/galleries/${node.frontmatter.city.toLowerCase()}`;
        let images = [];

        if (node.frontmatter && node.frontmatter.images) {
            images = node.frontmatter.images.map(object => {
                let image = object.image;
                let posLastSlash = image.lastIndexOf('/') + 1;
                return (image.substring(posLastSlash));
            });
        }
        createPage({
            path: url,
            component: GalleryTemplate,
            context: {
                city: node.frontmatter.city,
                images: images,
                location: node.frontmatter.location
            },
        })
    })
};