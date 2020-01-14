import React from "react"
import { Link, graphql } from "gatsby"
import moment from 'moment'
import Card from "react-bootstrap/Card"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Index({ data }) {
  const { edges } = data.allSitePage
  return (
    <Layout>
      <SEO title="Home" />
      {edges
        .map(({ node: {path, context: {date, excerpt, frontmatter: {title}}} }) => (
          <Card border="light">
            <Card.Body>
              <Card.Title>
                <Link style={{"color": "inherit"}} to={path}>{title}</Link>
                <br />
                <small>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</small>
              </Card.Title>
              <Card.Text>
                {excerpt}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </Layout>
  )
}
export const pageQuery = graphql`
  query IndexQuery {
    allSitePage(filter: {context: {blog: {eq: true}}}, sort: {fields: context___date, order: DESC}) {
      edges {
        node {
          path
          context {
            date
            excerpt
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`