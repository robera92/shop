
import { Link } from "react-router-dom";

const Pagination = (props) => {
    
    const pages = props.products.data.links.filter(link =>
        link.url !== null
      );

    const currentPage = props.currentPage;

    const formatPageNumberFromURL = (url) => {
        let cleanUrl = '/';
        let split = url.split('?page=');
        if(split[1] !== null){
            cleanUrl = '/page/' + split[1];
        }
        return cleanUrl;
    }
    // 

    return (
    <div className="row mt-4">
    <nav aria-label="Page navigation">
    <ul className="pagination justify-content-center flex-wrap">
        {pages.map( (link)=>
            <li key={link.label} className={"page-item " + (link.active ? 'active' : '')}>
                <Link className="page-link" to={formatPageNumberFromURL(link.url)} onClick={ ()=> { props.handleNumberChange(link.url); } }>{link.label.replace('&laquo;','').replace('&raquo;','')}</Link>
            </li>
        )}
    </ul>
    </nav>
    </div>);
}
 
export default Pagination;