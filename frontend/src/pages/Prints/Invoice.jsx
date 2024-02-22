import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { show } from "../../app/features/invoices/invoices.slice";
import FullscreenLoader from "../../components/utils/FullscreenLoader";
import "../../css/invoice.scss";
import Logo from "../../images/logo.jpg";

function Invoice() {
  const params = useParams();
  const dispatch = useDispatch();

  const { invoice } = useSelector((store) => store.invoices);

  useEffect(() => {
    dispatch(show(params.id));
  }, []);

  if (!invoice) return <FullscreenLoader />;

  return (
    <div className="print-container small">
      <div className="border text-center mx-2 py-2 px-2">
        <div className="text-end unprintable">
          <button type="button" className="mb-2" onClick={() => window.print()}>
            Print
          </button>
        </div>
        <img src={Logo} className="w-100 mb-2" alt="" />
        <h2 className="f18 fw-bold">Aesthetics | Premium Men&apos;s Salon</h2>
        <p className="f15">DHA, Phase 4, 25DD, Lahore</p>
        <p className="f15">0309 8487100</p>

        <div className="mt-2">
          <strong>Invoice#</strong> {invoice.id}
          <p>
            <strong>Date#</strong>{" "}
            {moment(invoice.created_at).format("DD/MM/YYYY hh:mma")}
          </p>
        </div>

        <table className="table table-bordered small table-sm mt-2">
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

        <table className="table small table-sm mt-2 text-end">
          <tbody>
            <tr>
              <th scope="row">Sub Total (Rs):</th>
              <td>{invoice.subtotal}</td>
            </tr>
            <tr>
              <th scope="row">
                {invoice.coupon_id ? "Coupon Discount (Rs)" : "Discount (Rs)"}
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
          <table className="table table-sm mb-0 small">
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
                <td>{moment(invoice.created_at).format("DD/MM/YYYY")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div className="d-flex align-items-center justify-content-between mt-2">
          <p>
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Invoice;
