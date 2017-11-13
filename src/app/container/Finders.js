import { DATA, findDataFromQuery } from "../services/finder";
import Finder from "../component/view/Finder";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Connect state data with component
const mapStateToProps = ( state ) => {
    return {
        [DATA]: state.finder[ DATA ]
    };
};

// Connect dispatcher with component
const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({
        findDataFromQuery
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Finder);
