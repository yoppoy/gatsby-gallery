import React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
    return (
        <Layout>
            <SEO title="Home" />
            <h1>Galleries</h1>
            <p>Now go build something great.</p>
            <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
                <Image />
            </div>
            <Link to="/page-2/">Go to page 2</Link>
        </Layout>
    )
}

export default IndexPage
