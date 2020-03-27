import React from 'react'
import {
  H1,
  H3,
  P,
  Buttons,
  Button,
  BR,
  Card,
  Callout,
} from '../components/shared'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { PROJECTS_ROUTE, CONTACT_ROUTE, HOME_ROUTE } from '../constants/routes'

const FreelancePage = (): React.ReactElement => (
  <Layout>
    <SEO title="Freelance" />

    <Callout backgroundImage="/images/freelance-backing.svg">
      <BR />
      <H1>Let&apos;s build something</H1>
      <P>
        I&apos;m a web developer passionate for beautiful, well-planned,
        well-built, and well-used products. Whatever you are imagining, drawing
        up, building, or growing, I&apos;d love to hear about it. Scroll through
        my work and take the time to reach out—it can go a long way.
      </P>
      <Buttons>
        <Button mb0 to={PROJECTS_ROUTE}>
          View my work
        </Button>
        <Button mb0 to={CONTACT_ROUTE}>
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

    <Card>
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
        I stress mobile-first development and responsively built, cross-platform
        products.
      </P>
    </Card>

    <BR />

    <H3>Compensation</H3>

    <P>
      Set projects are paid based on completion, more fluid projects are paid
      hourly. Further, you only pay for the work that I put directly into
      product: hours spent on learning and preliminary research are on me.
    </P>

    <P>
      If you work for a non-profit, or similar organization, send me an email
      and we can go from there.
    </P>

    <Buttons>
      <Button to={HOME_ROUTE}>&larr; Back to home</Button>
      <Button to={CONTACT_ROUTE}>Contact me</Button>
    </Buttons>
  </Layout>
)

export default FreelancePage
