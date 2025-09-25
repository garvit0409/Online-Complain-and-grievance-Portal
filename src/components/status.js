import React, { useState } from 'react';

function Status() {
  const [complaintId, setComplaintId] = useState('');
  const [complaintStatus, setComplaintStatus] = useState(null);
  const [reopenReason, setReopenReason] = useState('');
  const [isReopenEnabled, setIsReopenEnabled] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    setSubmissionMessage('');
    setComplaintStatus(null);
    setIsReopenEnabled(false);

    // Simulate fetching data from a backend
    const dummyData = {
      id: 'ABC-123',
      status: 'Closed',
      response: 'Your issue has been resolved by our support team.',
    };

    if (complaintId === dummyData.id) {
      setComplaintStatus(dummyData);
      if (dummyData.status === 'Closed') {
        setIsReopenEnabled(true);
      }
    } else {
      setSubmissionMessage('Complaint ID not found.');
    }
  };

  const handleReopen = async (e) => {
    e.preventDefault();
    if (!reopenReason) {
      setSubmissionMessage('Please provide a reason to reopen the complaint.');
      return;
    }

    // Simulate sending reopen request to backend
    setSubmissionMessage(`Reopen request for ID: ${complaintId} has been submitted. We will review your reason and get back to you.`);
    setComplaintStatus(null);
    setReopenReason('');
    setIsReopenEnabled(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Check Complaint Status</h2>
      
      <p style={{ marginTop: '20px' }}>
        Enter your complaint ID or email to view the status.
      </p>
      
      <form onSubmit={handleCheckStatus} style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          value={complaintId}
          onChange={(e) => setComplaintId(e.target.value)}
          placeholder="Enter Complaint ID" 
          required
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Check Status</button>
      </form>

      {submissionMessage && (
        <p style={{ marginTop: '20px', color: submissionMessage.includes('Reopen') ? 'green' : 'red' }}>
          {submissionMessage}
        </p>
      )}

      {complaintStatus && (
        <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: '30px auto' }}>
          <h3>Complaint Details for ID: {complaintStatus.id}</h3>
          <p><strong>Status:</strong> {complaintStatus.status}</p>
          <p><strong>Resolution:</strong> {complaintStatus.response}</p>
          
          {isReopenEnabled && (
            <div style={{ marginTop: '20px' }}>
              <h4>Not satisfied? Reopen the complaint.</h4>
              <form onSubmit={handleReopen}>
                <textarea
                  value={reopenReason}
                  onChange={(e) => setReopenReason(e.target.value)}
                  placeholder="Reason for reopening"
                  rows="4"
                  required
                  style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'orange', border: 'none', color: 'white', cursor: 'pointer' }}>
                  Reopen Complaint
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Status;
