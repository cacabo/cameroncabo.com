import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { H2, H4, Text } from '../shared'

// TODO images
export default () => (
  <StaticQuery
    query={graphql`
      query EducationQuery {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(education)/" } }
          sort: { order: DESC, fields: [frontmatter___start] }
        ) {
          edges {
            node {
              html
              frontmatter {
                start
                end
                title
                gpa
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { edges: edus } = data.allMarkdownRemark
      return (
        <>
          <H2>Education</H2>
          {edus.map(
            ({
              node: {
                html,
                frontmatter: { start, end, title, gpa },
              },
            }) => (
              <div key={title}>
                <H4 key={title} mb1>
                  {title}
                </H4>
                <Text sm lighter mb2>
                  {start} - {end} / {gpa} GPA
                </Text>
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            ),
          )}
        </>
      )
    }}
  />
)
