// Placed here for eventual reuse by gatsby-mdx
const remarkPlugins = [
  `gatsby-remark-mermaid`,
  `gatsby-remark-smartypants`,
  `gatsby-remark-reading-time`,
  {
    resolve: `@raae/gatsby-remark-oembed`,
    options: {
      usePrefix: false,
      providers: {
        exclude: ["Reddit"]
      }
    }
  },
  {
    resolve: `gatsby-remark-external-links`,
    options: {
      target: `_blank`,
      rel: `nofollow`
    }
  }
]

module.exports = {
  siteMetadata: {
    title: `Lo-Fi Skeptic`,
    description: `Laid-back skepticism and analogies for apologetics`,
    author: `@lofiskeptic`,
    image: 'https://festive-heyrovsky-e5771f.netlify.com/lofiskeptic.png'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: remarkPlugins
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `lofiskeptic.com`,
        short_name: `lofiskeptic`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/lofiskeptic.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
