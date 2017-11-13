import { Paper } from "material-ui-next";
import PropTypes from "prop-types";
import React from "react";

// Component that render out product
const Product = ( { image, name, description } ) => {
    return (
        <Paper className={"element"}>
            <img
                className={"image"}
                src={image}
            />
            <article>
                <h3 className={"name"}>{name}</h3>
                <span className={"description"}>{description}</span>
            </article>
        </Paper>
    );
};

Product.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
};

export default Product;
