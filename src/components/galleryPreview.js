import React from "react";
import Thumbnail from "./thumbnail";

export default GalleryPreview = ({data}) => {
    return (
        <div>
            <p>{data.title}</p>
            {data.images.map(image => <Thumbnail src={image}/>)}
        </div>
    );
};