import { Rate } from 'antd'
import React from 'react'

export default function FeedbackModal({ setRating, rating, handleChange, contentFeedback, handleSendFeedback, booking }) {
    return (
        <div class="modal fade"
            id="feedbackModal"
            tabindex="-1"
            aria-labelledby="feedbackModal"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Feedback</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <Rate onChange={(e) => setRating(e)} value={rating} />
                        <textarea
                            name="content"
                            onChange={handleChange}
                            placeholder="Content"
                            className="form-control m-2"
                            rows="40" cols="500"
                            style={{ resize: "none", height: "10rem", width: "27rem" }}
                            value={contentFeedback}
                        ></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary"
                            onClick={() => {
                                console.log({ star: rating, content: contentFeedback, booking: booking._id })
                                handleSendFeedback({ star: rating, content: contentFeedback, booking: booking._id })
                            }}>
                            Send Feedback
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
