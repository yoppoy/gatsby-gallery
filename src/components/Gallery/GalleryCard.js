import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'gatsby';
import {convertToKebabCase} from '../../lib/helpers';

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

export default ({gallery}) => {
    const classes = useStyles();

    return (
        <Link to={`/galleries/${convertToKebabCase(gallery.city)}`}>
            <Card className={classes.card}>
                <CardActionArea>
                    <div className={classes.overlay}>
                        <Typography className={classes.overlayText}>{gallery.city}</Typography>
                    </div>
                    <CardMedia
                        className={classes.media}
                        image={gallery.imageFluid ? gallery.imageFluid.src : null}
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
            </Card>
        </Link>
    );
}