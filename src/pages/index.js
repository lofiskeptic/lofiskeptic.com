import React from "react"
import { Link, graphql } from "gatsby"
import moment from 'moment'

import Card from "react-bootstrap/Card"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Twitter from "../components/twitter"

export default function Index({ data }) {
  const { edges } = data.allSitePage
  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <Row>
          <Col sm={6}>
            {edges
              .map(({ node: {path, context: {date, excerpt, frontmatter: {title}, readingTime}} }) => (
                <Card border="light">
                  <Card.Body>
                    <Card.Title>
                      <Link style={{"color": "inherit"}} to={path}>{title}</Link>
                    </Card.Title>
                    <Card.Text>
                      <small>
                        {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
                        {' - '}
                        {readingTime}
                      </small>
                      <br />
                      {excerpt}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
          </Col>
          <Col sm={6}>
            <Twitter />
          </Col>
        </Row>
      </Container>
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
            readingTime
          }
        }
      }
    }
  }
`