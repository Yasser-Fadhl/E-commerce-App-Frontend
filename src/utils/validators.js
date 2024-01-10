export function hasSpace(sentence) {
  return sentence.indexOf(" ") >= 0;
}
export function isValidEmail(email) {
  return /^[^@]+@\w+(\.\w+)+\w$/.test(email);
}
export function isValidPhoneNumber(phone) {
  if (!phone) return { status: false, message: "Please enter phone number" };
  if (typeof phone == "number") {
    if (phone.toString().length != 12) {
      return {
        status: false,
        message: "Phone number must be composed from 12 numbers",
      };
    } else if (!phone.toString().startsWith("249"))
      return {
        status: phone.toString().startsWith("249"),
        message: "Phone number must start with 249",
      };
  }
  if (typeof phone == "string") {
    if (phone.length != 12) {
      return {
        status: false,
        message: "Phone number must be composed from 12 numbers",
      };
    }
    if (!phone.startsWith("249"))
      return {
        status: phone.startsWith("249"),
        message: "Phone number must start with 249",
      };
  }
  return { status: true };
}

export function onlyNumber($event) {
  //console.log($event.keyCode); //keyCodes value
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    // 46 is dot

    $event.preventDefault();
  }
}
export function isLetter(e) {
  let char = String.fromCharCode(e.keyCode); // Get the character
  if (/^[A-Za-z]+$/.test(char)) {
    return true;
  } // Match with regex
  else e.preventDefault(); // If not match, don't add to input text
}
export function LengthValidator(lable, input, min, max) {
  if (!input) {
    return {
      status: false,
      message: `Please enter ${lable.toLowerCase()}`,
    };
  }

  if (typeof input === "number") {
    return {
      status: min <= input.toString().length && input.toString().length <= max,
      message: `${lable} length must be between ${min} and ${max}`,
    };
  }
  if (typeof input === "string") {
    return {
      status: min <= input.length && input.length <= max,
      message: `${lable} must be between ${min} and ${max} characters`,
    };
  }
  return true;
}
export function EmptyLengthValidator(lable, input, min, max) {
  if (typeof input === "number") {
    return {
      status: min <= input.toString().length && input.toString().length <= max,
      message: `${lable} length must be between ${min} and ${max}`,
    };
  }
  if (typeof input === "string") {
    return {
      status: min <= input.length && input.length <= max,
      message: `${lable} must be between ${min} and ${max} characters`,
    };
  }
  return true;
}
export function validate(input, Schema) {
  for (const [key, value] of Object.entries(input)) {
    // console.log({ key: value });
    console.log(Schema[key]);
    // if (typeof value === Schema[key].type) {
    //   return true;
    // }
    if (Schema[key].length)
      LengthValidator(
        key,
        value,
        Schema[key].length.min,
        Schema[key].length.max
      );
  }
}
