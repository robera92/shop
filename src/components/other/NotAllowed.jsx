import { Link } from "react-router-dom";

const NotAllowed = () => {
    return (
        <div className="d-flex align-items-center justify-content-center not-allowed">
            <h1 className="display-3 fw-bold">Please {<Link to="/login">login</Link>} to view this page!</h1>
        </div>
    );
}
 
export default NotAllowed;