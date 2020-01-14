import React from "react"

import Layout from "./layout"
import SEO from "./seo"

export default function Template({
  data,
}) {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <div className="blog-post-container">
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <div className="blog-post">
          <h1>{post.frontmatter.title}</h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      excerpt(pruneLength: 250)
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`