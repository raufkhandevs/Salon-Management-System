import moment from "moment";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { RiBillLine, RiPrinterLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { show } from "../../app/features/invoices/invoices.slice";
import Layout from "../../components/Layout";
import Container from "../../components/utils/Container";
import FullscreenLoader from "../../components/utils/FullscreenLoader";
import Logo from "../../images/logo.jpg";

function Show() {
  const params = useParams();
  const dispatch = useDispatch();

  const { invoice } = useSelector((store) => store.invoices);

  useEffect(() => {
    dispatch(show(params.id));
  }, []);

  if (!invoice) return <FullscreenLoader />;

  return (
    <Layout>
      <Container>
        <div
          className="card shadow border-0 mt-4"
          style={{ minHeight: "calc(100vh - 300px)" }}
        >
          <div className="card-body">
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <h1 className="mb-0">
                <RiBillLine size={50} className="me-3" />
                Invoices
              </h1>
              <Link to={`/prints/invoices/${params.id}`} target="_blank">
                <Button type="button" variant="success">
                  <RiPrinterLine /> Print
                </Button>
              </Link>
            </div>
            <div>
              <div className="border text-center mx-2 py-2 px-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="text-left">
                    <img
                      src={Logo}
                      style={{ width: "300px" }}
                      className="mb-2"
                      alt=""
                    />
                    <p>
                      <strong>Date#</strong>{" "}
                      {moment(invoice.created_at).format("DD/MM/YYYY hh:mma")}
                    </p>
                  </div>
                  <div className="text-end">
                    <h2 className="fw-bold">
                      Aesthetics | Premium Men&apos;s Salon
                    </h2>
                    <p>DHA, Phase 4, 25DD, Lahore</p>
                    <p>0309 8487100</p>
                    <strong>Invoice#</strong> {invoice.id}
                  </div>
                </div>

                <table className="table table-bordered mt-2">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Staff</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.services.map((service) => (
                      <tr>
                        <td>{service.service.name}</td>
                        <td>{service.user.name}</td>
                        <td>{service.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className="table mt-2 text-end">
                  <tbody>
                    <tr>
                      <th scope="row">Sub Total (Rs):</th>
                      <td>{invoice.subtotal}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {invoice.coupon_id
                          ? "Coupon Discount (Rs)"
                          : "Discount (Rs)"}
                      </th>
                      <td>{invoice.discount_amount}</td>
                    </tr>
                    <tr>
                      <th scope="row">Extra Charges (Rs)</th>
                      <td>{invoice.extra_charges}</td>
                    </tr>
                    <tr>
                      <th scope="row">Grand Total (Rs):</th>
                      <td>{invoice.total}</td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ borderTop: "2px dashed black" }}>
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>Payment Mode</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{invoice.payment_method}</td>
                        <td>{invoice.total}</td>
                        <td>
                          {moment(invoice.created_at).format("DD/MM/YYYY")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Show;
