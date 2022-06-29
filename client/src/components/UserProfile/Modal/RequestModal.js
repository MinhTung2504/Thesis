import React from "react";

export default function RequestModal({
  handleContentRequest,
  contentRequest,
  handleSendRequest,
}) {
  return (
    <div
      class="modal fade"
      id="requestModal"
      tabindex="-1"
      aria-labelledby="requestModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Request To Become Host
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-center">
            <textarea
              name="content"
              onChange={handleContentRequest}
              placeholder="Content"
              className="form-control m-2"
              rows="40"
              cols="500"
              style={{ resize: "none", height: "10rem", width: "27rem" }}
              value={contentRequest}
            ></textarea>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                handleSendRequest({
                  content: contentRequest,
                });
              }}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
