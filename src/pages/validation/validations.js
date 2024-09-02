export const ValidateField = (fieldName, value) => {
  switch (fieldName) {
    case "email":
      return validateEmail(value);
    case "title":
      return validateTitle(value);
    case "description":
      return validateDescription(value);
    case "address":
      return validateAddress(value);
    case "date":
      return validateDate(value);
    case "Ordinær":
    case "Student & U18":
    case "Ledsager":
      return validateCost(fieldName, value);
    case "code":
      return validateCouponCode(value);
    case "amount":
      return validateCouponCost(value);
    case "type":
      return validateCouponType(value);
    case "quantity":
      return validateCouponQunatity(value);
    case "isActive":
      return vaidateCouponStatus(value);
    default:
      return "";
  }
};

export const validateCouponCost = (value) => {
  if (!value?.trim()) {
    return "Coupon Cost is Required";
  } else {
    return "";
  }
};

export const validateCouponCode = (value) => {
  if (!value?.trim()) {
    return "Coupon Code is Required";
  } else {
    return "";
  }
};

export const validateCouponQunatity = (value) => {
  if (!value?.trim()) {
    return "Coupon Quantity is Required";
  } else {
    return "";
  }
};

export const validateCouponType = (value) => {
  if (!value?.trim()) {
    return "Select the Coupon Type";
  } else {
    return "";
  }
};

export const vaidateCouponStatus = (value) => {
  if (!value?.trim()) {
    return "Select the Coupon Status";
  } else {
    return "";
  }
};

//Validate Password
export const validatePassword = (name) => {
  if (!name?.trim()) {
    return "Please Enter the Password!";
  } else if (name.length === 0 || name.length < 8) {
    return "Please Enter the Password alteast 8 characters";
  } else {
    return "";
  }
};

//Validate Event Title
export const validateTitle = (name) => {
  if (!name?.trim()) {
    return "Event Title is Required!";
  }
  return "";
};

//Validate Event Description
export const validateDescription = (description) => {
  if (!description?.trim()) {
    return "Event Description is Required !";
  }
  return "";
};

//Validate Event Address
export const validateAddress = (address) => {
  if (!address?.trim()) {
    return "Event Address is Required !";
  }
  return "";
};

//Validate Cost
export const validateEventCost = (cost) => {
  if (cost <= 0) {
    return "Event cost is Required !";
  }
};

//Validate Date
export const validateDate = (date) => {
  if (date === null) {
    return "Date and Time is Required";
  }
};

//validate the email
export function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isValid = regex.test(email);
  if (isValid) {
    return "";
  } else {
    return "Please Enter Valid Email";
  }
}

//validate Email
export const validateEmail = (email) => {
  if (!email?.trim()) {
    return "Email is Required";
  } else {
    return isValidEmail(email);
  }
};

//validate MaxTickets
const validateMaxTicket = (ticketPrice) => {
  if (ticketPrice <= 0) {
    return "Enter Max Ticket Number !";
  }
};

export const validateCost = (name, cost) => {
  switch (name) {
    case "Ordinær":
      return validateEventCost(cost);
    case "Student & U18":
      return validateEventCost(cost);
    case "Ledsager":
      return validateEventCost(cost + 1);
  }
};

export const validatePasswordForm = (formData) => {
  const newErrors = {
    newPassword: validatePassword(formData?.newPassword),
    confirmPassword: validatePassword(formData?.confirmPassword),
  };
  if (newErrors?.newPassword || newErrors?.confirmPassword) {
    return newErrors;
  } else {
    return "";
  }
};

export const validateForm = (formData) => {
  const newErrors = {
    title: validateTitle(formData?.title),
    description: validateDescription(formData?.description),
    address: validateAddress(formData?.address),
    max_tickets: validateMaxTicket(formData?.max_tickets),
    date: validateDate(formData?.date),
    ticket_types: {
      Ordinær: validateCost("Ordinær", formData?.ticket_types?.Ordinær),
      "Student & U18": validateCost(
        "Student & U18",
        formData?.ticket_types["Student & U18"]
      ),
      Ledsager: validateCost("Ledsager", formData?.ticket_types?.Ledsager),
    },
  };

  if (
    newErrors?.title ||
    newErrors?.description ||
    newErrors?.address ||
    newErrors?.max_tickets ||
    newErrors?.date ||
    newErrors?.ticket_types.Ordinær ||
    newErrors?.ticket_types["Student & U18"] ||
    newErrors?.ticket_types.Ledsager
  ) {
    return {
      err: newErrors,
    };
  } else {
    return { err: "" };
  }
};

export const validateProfileForm = (formData) => {
  const newErrors = {
    email: validateEmail(formData?.email),
  };
  if (newErrors?.email) {
    return newErrors;
  } else {
    return "";
  }
};

export const validateCouponForm = (formData) => {
  const newErrors = {
    code: validateCouponCode(formData?.code),
    amount: validateCouponCost(formData?.amount),
    quantity: validateCouponQunatity(formData?.quantity),
    type: validateCouponType(formData?.type),
    // isActive:vaidateCouponStatus(formData?.isActive)
  };
  if (
    newErrors?.code ||
    newErrors?.amount ||
    newErrors?.quantity ||
    newErrors?.type
  ) {
    return {
      err: newErrors,
    };
  } else {
    return { err: "" };
  }
};
