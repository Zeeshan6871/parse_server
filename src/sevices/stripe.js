const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function getPaymentStatus(sessionId) {
  return fetch(`${SERVER_URL}/session-status?session_id=${sessionId}`).then(
    (res) => res.json()
  );
}

export function createCheckout(ticketAmount, userEmail, bookingId) {
  //   console.log("createCheckout", ticketAmount, userEmail, bookingId);
  return fetch(`${SERVER_URL}/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: ticketAmount,
      email: userEmail,
      bookingId: bookingId,
    }),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}
