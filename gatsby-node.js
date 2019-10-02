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
              }
            }
          }
        }
      }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return
    }

    const GalleryTemplate = path.resolve(`src/templates/galleryTemplate.js`);
    result.data.allMarkdownRemark.edges.forEach(({node}) => {
        const url = `/galleries/${node.frontmatter.city.toLowerCase()}`;
        console.log("creating : ", url);
        createPage({
            path: url,
            component: GalleryTemplate,
            context: {},
        })
    })
};