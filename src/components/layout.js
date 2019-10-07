import React from "react"
import PropTypes from "prop-types"
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import {useStaticQuery, graphql} from "gatsby"
import Header from "./header"
import "./layout.css"

const THEME = createMuiTheme({
});

const Layout = ({children, showPadder = true}) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <MuiThemeProvider theme={THEME}>
            <Header siteTitle={data.site.siteMetadata.title}/>
            <div
                style={ showPadder && {
                    margin: `0 auto`,
                    maxWidth: 1200,
                    padding: `0px 1.0875rem 1.45rem`,
                    paddingTop: 0,
                }}
            >
                <main>{children}</main>
            </div>
        </MuiThemeProvider>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
