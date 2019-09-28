/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from 'styled-components';
import { rhythm } from "../utils/typography"

const Svg = styled.svg`
  width: 1.3rem;
  height: 1.3rem;
  margin: 0 0.2rem;

  &:hover {
    cursor: pointer;
  }
`;

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              flexDirection: `column`,
              marginBottom: rhythm(2.5),
            }}
          >
          <div style={{
              display: `flex` }}>
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p style={{ marginBottom: '0.5rem' }}>
              I'm <strong>{author}</strong> a Web Developer based Dublin. I build web pages and online tools for HubSpot.
            </p>
            </div>

            <div>
              <a style={{ boxShadow: 'none' }} href="https://github.com/collinstommy">
                <Svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23" />
                </Svg></a>
                <a style={{ boxShadow: 'none' }} href="https://www.linkedin.com/in/thomas-collins-327b0016/"><Svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="430.117px" height="430.118px" viewBox="0 0 430.117 430.118" >
                  <path id="LinkedIn__x28_alt_x29_" d="M398.355,0H31.782C14.229,0,0.002,13.793,0.002,30.817v368.471c0,17.025,14.232,30.83,31.78,30.83h366.573c17.549,0,31.76-13.814,31.76-30.83V30.817C430.115,13.798,415.904,0,398.355,0zM130.4,360.038H65.413V165.845H130.4V360.038z M97.913,139.315h-0.437c-21.793,0-35.92-14.904-35.92-33.563c0-19.035,14.542-33.535,36.767-33.535c22.227,0,35.899,14.496,36.331,33.535C134.654,124.415,120.555,139.315,97.913,139.315zM364.659,360.038h-64.966V256.138c0-26.107-9.413-43.921-32.907-43.921c-17.973,0-28.642,12.018-33.327,23.621c-1.736,4.144-2.166,9.94-2.166,15.728v108.468h-64.954c0,0,0.85-175.979,0-194.192h64.964v27.531c8.624-13.229,24.035-32.1,58.534-32.1c42.76,0,74.822,27.739,74.822,87.414V360.038z M230.883,193.99c0.111-0.182,0.266-0.401,0.42-0.614v0.614H230.883z" />
                </Svg></a>
            </div>

          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`

export default Bio
