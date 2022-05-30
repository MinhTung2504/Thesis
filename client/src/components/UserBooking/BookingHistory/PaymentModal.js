import React from "react";
import { formatDate } from "../../../utils";

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
            <h5 class=" text-center" id="paymentModalDetail">
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
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <strong>
                  {`Payment for ${payment.name_payment}`.toUpperCase()}
                </strong>
              </li>
              <li class="list-group-item">
                <strong>Total Payment:</strong> {payment.total}
              </li>
              <li class="list-group-item">
                <strong>Payment Method:</strong> {payment.payment_method}
              </li>
              <li class="list-group-item">
                <strong>Payment Status:</strong> {payment.status}
              </li>
              <li class="list-group-item">
                <strong>Payment Created At:</strong>{" "}
                {formatDate(new Date(payment.createdAt))}
              </li>
            </ul>
          </div>
          <div class="modal-footer text-center">
            <button
              type="button"
              class="btn btn-secondary"
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
