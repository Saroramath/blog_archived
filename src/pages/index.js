import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import MainCard from "../components/MainCard"
import GetRandomData from "../components/data/data_component"
import { Link } from "gatsby"

const loadsPer = 15

const IndexPage = ({ data }) => {
  const [loaded, setLoaded] = useState(undefined)
  const posts = data.allMdx.edges

  useEffect(() => {
    const curLoad = sessionStorage.getItem("curLoad") || loadsPer
    setLoaded(parseInt(curLoad))
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  const handleScroll = () => {
    const lastPostLoaded = document.querySelector(
      "div.posts-list > a:last-child"
    )
    const lastPostLoadedOffset =
      lastPostLoaded.offsetTop + lastPostLoaded.clientHeight
    const pageOffset = window.pageYOffset + window.innerHeight

    if (pageOffset > lastPostLoadedOffset) {
      // Stops loading
      if (posts.length > loaded)
        setLoaded(prev => {
          sessionStorage.setItem("curLoad", prev + loadsPer)
          return prev + loadsPer
        })
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      
      <MainCard posts={posts} loads={loaded} />
      <Link to="/data/">Click to see dancing Data</Link>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          id
          body
          excerpt(pruneLength: 180, truncate: true)
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MM/DD/YYYY")
            title
            tags
            excerpt
            draft
          }
        }
      }
    }
  }
`

export default IndexPage
