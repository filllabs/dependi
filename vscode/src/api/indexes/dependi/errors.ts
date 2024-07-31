export enum Errors {
  NULL = "Null",
  UNDEFINED = "Undefined",
  DLR = "Device Limit reached. You can edit your api key or visit dependi.io dashboard to manage devices.",
  IVDID = "Invalid device ID",
  PAYRQ = "Payment required. Please visit dependi.io dashboard to update your payment method.",
  UNAUTH = "Unauthorized, please check your api key.",
  IVAK = "Invalid api key or api key not found. Please check your api key.",
  UINA = "User is not active. Please check emails from us or visit dependi.io dashboard.",
}


export function getError(error?: string): string {
  if (!error) {
    return Errors.NULL;
  }
  const code = error.split(" - ")[0];
  return Errors[code as keyof typeof Errors] || error;
}