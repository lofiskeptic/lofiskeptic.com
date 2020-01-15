const path = require("path")
const { omit } = require('ramda')

const pathWithoutExt = fullpath => path.format(omit(['ext', 'base'], path.parse(fullpath)))

exports.createPages = async ({ actions: {createPage}, graphql, reporter }) => {
  const blogPostTemplate = path.resolve(`src/components/page-template.js`)
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            fields {
              readingTime {
                text
              }
            }
            frontmatter {
              title
              path
              date
            }
            html
            parent {
              id
              ... on File {
                modifiedTime
                relativePath
              }
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    console.log(result.errors)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const computedPath = node.frontmatter.path || pathWithoutExt(node.parent.relativePath)
    createPage({
      path: computedPath,
      component: blogPostTemplate,
      context: {
        blog: true,
        date: node.frontmatter.date || node.parent.modifiedTime,
        excerpt: node.frontmatter.description || node.excerpt,
        frontmatter: node.frontmatter,
        html: node.html,
        readingTime: node.fields.readingTime.text
      },
    })
  })
}