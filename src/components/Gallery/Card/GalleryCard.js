import React from 'react';
import {graphql, useStaticQuery} from "gatsby";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'gatsby';
import Thumbnail from "../../thumbnail";

const useStyles = makeStyles({
    card: {
        width: 345,
        margin: 15,
        marginBottom: 7
    },
    media: {
        height: 200,
    },
    overlay: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        transition: '.2s ease-in-out',
        opacity: 1,
        '&:hover': {
            opacity: 0
        },
    },
    overlayText: {
        fontSize: 30,
        fontWeight: 100
    }
});

const queryAllImages = graphql`
    query {
        images: allFile(
            filter: { extension: { regex: "/jpeg|jpg|png|gif/" } }
        ) {
            edges {
                node {
                    extension
                    relativePath
                    childImageSharp {
                        fluid(maxWidth: 600) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;

export default ({gallery}) => {
    const classes = useStyles();
    const query = useStaticQuery(queryAllImages);
    const background = gallery.images.length > 0 ? query.images.edges.find(edge => {
        return gallery.images[0].image.includes(edge.node.relativePath);
    }) : null;

    return (
        <Link to={`/galleries/${gallery.city.toLowerCase()}`}>
            <Card className={classes.card}>
                <CardActionArea>
                    <div className={classes.overlay}>
                        <Typography className={classes.overlayText}>{gallery.city}</Typography>
                    </div>
                    <CardMedia
                        className={classes.media}
                        image={background.node.childImageSharp.fluid.src}
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
            </Card>
        </Link>
    );
}