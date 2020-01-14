import React from "react"
import { Link, graphql } from "gatsby"

import Card from "react-bootstrap/Card"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Index({ data }) {
  const { edges } = data.allSitePage
  return (
    <Layout>
      <SEO title="Home" />
      {edges
        .map(({ node: {path, context: {excerpt, frontmatter: {title}}} }) => (
          <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              {excerpt}
            </Card.Text>
            <Link to={path}>Read more &raquo;</Link>
          </Card.Body>
        </Card>
        ))}
    </Layout>
  )
}
export const pageQuery = graphql`
  query IndexQuery {
    allSitePage(filter: {context: {blog: {eq: true}}}, sort: {fields: context___frontmatter___date, order: DESC}) {
      edges {
        node {
          path
          context {
            excerpt
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  }
`