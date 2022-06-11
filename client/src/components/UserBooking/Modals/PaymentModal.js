import React from "react";
import { formatCurrency, formatDate } from "../../../utils";

export default function PaymentModal({ payment }) {
  return (
    <div
      class="modal fade"
      id="paymentModalDetail"
      tabindex="-1"
      aria-labelledby="paymentModalDetail"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content text-center">
          <div class="modal-header">
            <h5
              class="text-center"
              id="paymentModalDetail"
              style={{
                textAlign: "center",
                justifyItems: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Payment Detail
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="list-group list-group-flush">
              <li class="list-group-item">
                <strong>
                  {`Payment for ${payment.name_payment}`.toUpperCase()}
                </strong>
              </li>
              <hr />
            </div>
            <div className="row">
              <div className="col-sm-6">
                <h5>
                  <strong>Total:</strong>
                </h5>
                <h5>
                  <strong>Method:</strong>
                </h5>
                <h5>
                  <strong>Status:</strong>
                </h5>
                <h5>
                  <strong>Created At:</strong>
                </h5>
              </div>
              <div className="col-sm-6">
                <h5>{formatCurrency(payment.total * 23000)}</h5>
                <h5>{payment.payment_method}</h5>
                <h5>{payment.status}</h5>
                <h5>{formatDate(new Date(payment.createdAt))}</h5>
              </div>
            </div>
          </div>
          <div class="modal-footer text-center">
            <button
              type="button"
              class="btn btn-warning"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
