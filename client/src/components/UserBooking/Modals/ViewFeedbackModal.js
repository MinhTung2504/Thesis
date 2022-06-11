import { Rate } from 'antd'
import React from 'react'

export default function ViewFeedbackModal({ feedback }) {
    return (
        <div class="modal fade"
            id="viewFeedback"
            tabindex="-1"
            aria-labelledby="viewFeedback"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Feedback</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <Rate value={feedback.star} />
                        <textarea
                            name="content"
                            placeholder="Content"
                            className="form-control m-2"
                            rows="40" cols="500"
                            style={{ resize: "none", height: "10rem", width: "27rem" }}
                            value={feedback.content}
                        ></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
