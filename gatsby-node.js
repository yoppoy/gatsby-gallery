const path = require("path");
const {createFilePath} = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({node, actions, getNode}) => {
    const {createNodeField} = actions;

    if (node.internal.type === 'SitePage' && node.path === '/') {
        console.log(node);
    }
    if (node.internal.type === 'MarkdownRemark') {
        const slug = createFilePath({node, getNode, basePath: `galleries`, trailingSlash: false});
        createNodeField({node, name: `slug`, value: `/galleries${slug}`});
        if (node.frontmatter && node.frontmatter.images) {
            let images = node.frontmatter.images.map(object => {
                let image = object.image;
                let posLastSlash = image.lastIndexOf('/') + 1;
                return (image.substring(posLastSlash));
            });
            createNodeField({node, name: `images`, value: images});
        }
    }
};


exports.createPages = async ({graphql, actions, reporter}) => {
    const galleries = await graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                city
                location
              }
              fields {
                slug
                images
              }
            }
          }
        }
      }`);

    actions.createPage({
        path: "/",
        component: path.resolve(`src/pages-custom/home.js`),
        context: {
            galleries: galleries.data.allMarkdownRemark.edges.map(({node}) => {
                return ({
                    city: node.frontmatter.city,
                    preview: node.fields.images.length > 0 ? node.fields.images[0] : null
                });
            }),
            previews: galleries.data.allMarkdownRemark.edges.map(({node}) => node.fields.images.length > 0 ? node.fields.images[0] : null)
        }
    });

    if (galleries.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        reporter.panicOnBuild(JSON.stringify(result.errors));
        return;
    } else {
        galleries.data.allMarkdownRemark.edges.forEach(({node}) => {
            console.log(node.fields);
            actions.createPage({
                path: node.fields.slug,
                component: path.resolve(`src/templates/galleryTemplate.js`),
                context: {
                    city: node.frontmatter.city,
                    images: node.fields.images,
                    location: node.frontmatter.location
                },
            })
        })
    }
};