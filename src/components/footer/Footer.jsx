const Footer = () => {
    return (
       <footer className="text-center text-lg-start text-muted mt-4 border-top">
        <section className="">
            <div className="container text-center text-md-start pt-4 pb-4">
            <div className="row mt-3">
                <div className="col-6 col-sm-4 col-lg-3">
                <h6 className="text-uppercase text-dark fw-bold mb-2">
                    Store
                </h6>
                <ul className="list-unstyled mb-4">
                    <li><a className="text-muted" href="#">About us</a></li>
                    <li><a className="text-muted" href="#">Find store</a></li>
                    <li><a className="text-muted" href="#">Categories</a></li>
                    <li><a className="text-muted" href="#">Blogs</a></li>
                </ul>
                </div>
                <div className="col-6 col-sm-4 col-lg-3">
                <h6 className="text-uppercase text-dark fw-bold mb-2">
                    Information
                </h6>
                <ul className="list-unstyled mb-4">
                    <li><a className="text-muted" href="#">Help center</a></li>
                    <li><a className="text-muted" href="#">Money refund</a></li>
                    <li><a className="text-muted" href="#">Shipping info</a></li>
                    <li><a className="text-muted" href="#">Refunds</a></li>
                </ul>
                </div>
                <div className="col-6 col-sm-4 col-lg-3">
                <h6 className="text-uppercase text-dark fw-bold mb-2">
                    Support
                </h6>
                <ul className="list-unstyled mb-4">
                    <li><a className="text-muted" href="#">Help center</a></li>
                    <li><a className="text-muted" href="#">Documents</a></li>
                    <li><a className="text-muted" href="#">Account restore</a></li>
                    <li><a className="text-muted" href="#">My orders</a></li>
                </ul>
                </div>
                <div className="col-12 col-sm-12 col-lg-3">
                <h6 className="text-uppercase text-dark fw-bold mb-2">Newsletter</h6>
                <p className="text-muted">Stay in touch with latest updates about our products and offers</p>
                <div className="input-group mb-3">
                    <input type="email" className="form-control border" placeholder="Email" aria-label="Email" aria-describedby="button-addon2"/>
                    <button className="btn btn-light border shadow-0" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                    Join
                    </button>
                </div>
                </div>
            </div>
            </div>
        </section>
        </footer>
    );
}
 
export default Footer;