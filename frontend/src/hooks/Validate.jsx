const Validate = (values) => {
  let errors = {};
  console.log("VALUES: ", values);

  if ("firstName" in values) {
    if (!values.firstName) {
      errors.firstName = "First name is required";
    } else if (values.firstName.length > 50) {
      errors.firstName = "First name must be less than 50 characters";
    }
  }

  if ("first_name" in values) {
    if (!values.first_name) {
      errors.first_name = "First name is required";
    } else if (values.first_name.length > 50) {
      errors.first_name = "First name must be less than 50 characters";
    }
  }

  if ("lastName" in values) {
    if (!values.lastName) {
      errors.lastName = "Last name is required";
    } else if (values.lastName.length > 50) {
      errors.lastName = "Last name must be less than 50 characters";
    }
  }
  if ("last_name" in values) {
    if (!values.last_name) {
      errors.last_name = "Last name is required";
    } else if (values.last_name.length > 50) {
      errors.last_name = "Last name must be less than 50 characters";
    }
  }

  if ("fullName" in values) {
    if (!values.fullName) {
      errors.fullName = "Full name is required";
    } else if (values.fullName.length > 50) {
      errors.fullName = "Full name must be less than 50 characters";
    }
  }
  if ("username" in values) {
    if (!values.username) {
      errors.username = "Username is required";
    } else if (values.username.length > 50) {
      errors.username = "Username must be less than 50 characters";
    } else if (!/^[A-Za-z]+$/i.test(values.username)) {
    } else if (values.username.length < 3) {
      console.log("made it");
      errors.username = "Username must be at least 3 characters";
    } else if (!/^[A-Za-z]+$/i.test(values.username)) {
      errors.username = "Username can only contain letters";
    }
  }

  if ("email" in values) {
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
  }

  if ("password" in values) {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(values.password)) {
      errors.password = "Password must contain at least one digit";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(values.password)) {
      errors.password = "Password must contain at least one special character";
    }
  }

  if ("url" in values) {
    if (!values.url) {
      errors.url = "URL is required";
    } else if (!/^http[s]?:\/\/.+/.test(values.url)) {
      errors.url = "URL must start with http:// or https://";
    }
  }

  if ("phone" in values) {
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?\d{8,15}$/.test(values.phone)) {
      errors.phone = "Phone number is invalid";
    }
  }

  if ("resume" in values) {
    if (!values.resume) {
      errors.resume = "Resume is required";
    }
  }
  
  if ("zipcode" in values) {
    if (!values.zipcode) {
      errors.zipcode = "Zipcode is required";
    }
    if (!/^\d{5}$/.test(values.zipcode)) {
      errors.zipcode =
        "The zip code field must be exactly 5 digits long and contain only numbers.";
    }
  }

  if ("city" in values) {
    console.log(values.city);
    if (!values.city) {
      errors.city = "City is required";
    }
    if (!/^[a-zA-Z]+$/.test(values.city)) {
      errors.city = "The city field must contain only alphabetic characters.";
    }
    if (values.city.length < 2) {
      errors.city = "The city field must be at least 2 characters long.";
    }
    if (values.city.length > 50) {
      errors.city = "The city field cannot exceed 50 characters.";
    }
  }

  if ("creditCard" in values) {
    if (!values.creditCard) {
      errors.creditCard = "Credit card number is required";
    } else if (!/^\d{16}$/.test(values.creditCard)) {
      errors.creditCard = "Credit card number is invalid";
    }
  }

  if ("securityCode" in values) {
    if (!values.securityCode) {
      errors.securityCode = "Security code is required";
    } else if (!/^\d{3}$/.test(values.securityCode)) {
      errors.securityCode = "Security code is invalid";
    }
  }

  return errors;
};

export default Validate;
