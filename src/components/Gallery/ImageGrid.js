import React from "react";
import Img from "gatsby-image";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
        container: {
            display: "flex", flexDirection: "row"
        },
        gridGallery: {
            display: "flex",
            flexWrap: "wrap",
            '&::after': {
                content: '',
                flexGrow: 999999999
            }
        },
        gridImageContainer: {
            position: "relative",
            cursor: "pointer",
            margin: 5,
        },
        gridPadder: {
            display: "block"
        },
        gridImage: {
            position: "absolute",
            top: 0,
            width: "100%",
            verticalAlign: "bottom"
        }
    }
));

export default ({images, onImageClick}) => {
    const classes = useStyles();

    console.log(images);
    return (
        <div className={classes.gridGallery}>
            {images.map((image, index) => {
                console.log(image);
                let ratio = image.childImageSharp.sizes.aspectRatio;
                return (
                    <div
                        key={image.name} className={classes.gridImageContainer}
                        style={{width: `${ratio * 400}px`, flexGrow: ratio * 400}}
                        onClick={() => onImageClick(index)}>
                        <Img className={classes.gridImage} sizes={image.childImageSharp.sizes}/>
                    </div>);
            })}
        </div>);
};