import React from "react"
import { graphql } from 'gatsby'

import Layout from "./layout"
import SEO from "./seo"

/*

 */

export default function Template({
  data,
}) {
  const { sitePage: { context } } = data
  return (
    <Layout>
      <div className="blog-post-container">
        <SEO title={context.frontmatter.title} description={context.excerpt} />
        <div className="blog-post">
          <h1>{context.frontmatter.title}</h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: context.html }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    sitePage(path: { eq: $path }) {
      context {
        excerpt
        frontmatter {
          title
          date
        }
        html
      }
    }
  }
`