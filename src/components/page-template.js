import React from "react"
import { graphql } from 'gatsby'
import moment from 'moment'

import Layout from "./layout"
import SEO from "./seo"

export default function Template({
  data,
}) {
  const { sitePage: { context } } = data
  return (
    <Layout>
      <SEO title={context.frontmatter.title} description={context.excerpt} />
      <h1>{context.frontmatter.title}</h1>
      <small>{moment(context.date).format('MMMM Do YYYY, h:mm:ss a')}</small>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: context.html }}
      />
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