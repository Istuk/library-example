export function noEmptyFields(object: any) {
  const keys = Object.keys(object);
  let valid = true;

  keys.forEach((key) => {
    if (object[key] === '' || !object[key]) valid = false;
  });

  return valid;
}