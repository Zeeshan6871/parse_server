// CheckoutPage.js
import React from 'react';
import { useForm } from 'react-hook-form';

const CheckoutPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form data: ", data);
    // Handle form submission, payment processing
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Full Name */}
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register("name", { required: "Full Name is required" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
        
        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="example@example.com"
          {...register("email", { 
            required: "Email is required", 
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Card Number */}
        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          {...register("cardNumber", { 
            required: "Card number is required",
            pattern: {
              value: /^\d{16}$/,
              message: "Card number must be 16 digits"
            }
          })}
        />
        {errors.cardNumber && <p className="error">{errors.cardNumber.message}</p>}

        {/* Expiry Date */}
        <label htmlFor="expiryDate">Expiry Date</label>
        <input
          id="expiryDate"
          type="text"
          placeholder="MM/YY"
          {...register("expiryDate", { 
            required: "Expiry date is required",
            pattern: {
              value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
              message: "Invalid expiry date format"
            }
          })}
        />
        {errors.expiryDate && <p className="error">{errors.expiryDate.message}</p>}

        {/* CVV */}
        <label htmlFor="cvv">CVV</label>
        <input
          id="cvv"
          type="text"
          placeholder="123"
          {...register("cvv", { 
            required: "CVV is required",
            pattern: {
              value: /^[0-9]{3,4}$/,
              message: "CVV must be 3 or 4 digits"
            }
          })}
        />
        {errors.cvv && <p className="error">{errors.cvv.message}</p>}
        
        {/* Submit Button */}
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
