const config = require("./customize")
const rss = require("./gatsby-rss")
const remarkMath = require(`remark-math`)

module.exports = {
  siteMetadata: config,
  pathPrefix: "/blog", 
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-offline`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-remark-emoji`, // Emoji list: https://emojipedia.org/joypixels/
    rss,

    // Read markdown/mdx files
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/_posts`,
      },
    },

    // Read images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/_assets`,
      },
    },

    // mdx support
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [require(`remark-math`)],
        rehypePlugins: [require(`rehype-katex`)],
        gatsbyRemarkPlugins: [
          // Adding title to code blocks. Usage: ```js:title=example.js
          {
            resolve: "gatsby-remark-code-titles",
            options: {
              className: "code-title-custom",
            },
          },

          // Process images in markdown
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: config.maxWidth,
              backgroundColor: `transparent`,
              linkImagesToOriginal: false,
            },
          },

          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `anchor-heading`,
            },
          },

          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `${__dirname}/_posts`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
          //adding math here 
          //`gatsby-remark-katex`,

        ], //remarkPlugins: [remarkMath],
      },
    },

    // Using svg as component
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /_assets/,
        },
      },
    },

    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // Removes warnings trying to use non-gatsby image in markdown
        checkSupportedExtensions: false,
      },
    },

    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.gaTrackingId,
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // Somehow need to be defined under both gatsby-plugin-mdx & gatsby-transformer-remark to work
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `anchor-heading`,
            },
          },

          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: config.maxWidth,
              backgroundColor: `transparent`,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          },




        ],
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-blog-mdx`,
        short_name: `blog`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: config.faviconSrc, // This path is relative to the root of the site.
      },
    },

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `dummy`,
        path: `${__dirname}/src/z_`,
      },
    },
  ],
}
