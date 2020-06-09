import React from 'react'

import { H1, H3, P, Buttons, Button, BR, Callout } from '../components/shared'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { PROJECTS_ROUTE, CONTACT_ROUTE, HOME_ROUTE } from '../constants/routes'
import { BORDER } from '../constants/colors'
import { BORDER_RADIUS_LG } from '../constants/measurements'

const FreelancePage = (): React.ReactElement => (
  <Layout>
    <SEO title="Freelance" />

    <Callout backgroundImage="/images/freelance-backing.svg">
      <BR />
      <H1>{"Let's build something"}</H1>
      <P>
        {`I'm a web developer passionate for beautiful, well-planned,
        well-built, and well-used products. Whatever you are imagining,
        building, or growing, I'd love to hear about it. Scroll through my
        work and take the time to reach out—it can go a long way.`}
      </P>
      <Buttons>
        <Button to={PROJECTS_ROUTE} style={{ marginBottom: 0 }}>
          View my work
        </Button>
        <Button as="a" href={CONTACT_ROUTE} style={{ marginBottom: 0 }}>
          Contact me
        </Button>
      </Buttons>
      <BR />
    </Callout>

    <BR />

    <H3>What I do best</H3>

    <P>
      I build sleek, user-centric websites. All of my work keeps to similar
      practices allowing for rapid prototyping.
    </P>

    <P>
      Each website is completely personalized in content, structure, and design
      in order to best accomplish what the site sets out to.
    </P>

    <BR />

    <Callout
      style={{ border: `2px solid ${BORDER}`, borderRadius: BORDER_RADIUS_LG }}
    >
      <H3 mb2>Your timeline, your vision</H3>
      <P lighter>
        Every project is personalized to your budget, timeframe, and
        specifications.
      </P>

      <H3 mb2>Full-stack, full-process</H3>
      <P lighter>
        I develop, test, and maintain projects of all scales and at all stages.
      </P>

      <H3 mb2>Flexible, modern tech</H3>
      <P lighter mb0>
        Mobile-first, responsive development, cross-platform products.
      </P>
    </Callout>

    <BR />

    <H3>Compensation</H3>

    <P>
      Set projects where we can come up with a well-scoped set of requirements
      are paid based on completion of milestones. More fluid projects are paid
      hourly so we have flexibility in terms of what we build to meet your
      needs. Further, you only pay for the work that I put directly into
      product: hours spent on learning and preliminary research are on me.
    </P>

    <P>
      If you work for a non-profit or a similarly mission-driven organization,
      send me an email and we can go from there.
    </P>

    <Buttons>
      <Button to={HOME_ROUTE}>&larr; Back to home</Button>
      <Button as="a" href={CONTACT_ROUTE}>
        Contact me
      </Button>
    </Buttons>
  </Layout>
)

export default FreelancePage
