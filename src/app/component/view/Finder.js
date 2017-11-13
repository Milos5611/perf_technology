import { Grid, Paper, TextField } from "material-ui-next";
import Product from "../widget/Product";
import PropTypes from "prop-types";
import React from "react";
import debounce from "lodash/debounce";
import uuid from "uuid";

class Finder extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        findDataFromQuery: PropTypes.func
    };

    constructor( props ) {
        super(props);

        // Just in case save query parameter with in component
        this.state = {
            value: props.data
        };

        // debounce method to dispatch
        this.changed = debounce(props.findDataFromQuery, 200);
    }

    handleQuery = ( query ) => {
        const value = query.target.value;

        // Keep query wit in state and fire rest call on callback
        this.setState({ value: value }, () => {
            this.changed(value);
        });
    };

    render() {
        const { data } = this.props;
        return (
            <div className={"root"}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={6}
                    >
                        <Paper>
                            <TextField
                                id="search"
                                label="Search field"
                                placeholder="Type something"
                                type="search"
                                autoFocus
                                fullWidth
                                onKeyDown={( query ) => this.handleQuery(query)}
                            />
                            {
                                data && data.map(filterArray => {
                                    return filterArray.hits.map(product => {
                                        return (
                                            <Product
                                                key={uuid.v4()}
                                                image={product.image}
                                                name={product.name}
                                                description={product.description}

                                            />);
                                    });
                                })
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Finder;
