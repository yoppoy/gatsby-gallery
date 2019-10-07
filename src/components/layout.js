import React from "react"
import PropTypes from "prop-types"
import {MuiThemeProvider, createMuiTheme, makeStyles} from "@material-ui/core";
import {useStaticQuery, graphql} from "gatsby"
import Header from "./header"
import "./layout.css"

const THEME = createMuiTheme({});

const useStyles = makeStyles(theme => ({
    container: {
        margin: `0 auto`,
        maxWidth: 1200,
        padding: `0px 1.0875rem 1.45rem`,
        paddingTop: 0,
    }
}));

const Layout = ({children, showPadder = true, style = {}}) => {
    const classes = useStyles();
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
            <div className={showPadder ? classes.container : {}} style={{...style}}>
                <main>{children}</main>
            </div>
        </MuiThemeProvider>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
