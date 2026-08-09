export type PaymentType =
  | "WIRE_DOMESTIC"
  | "WIRE_INTERNATIONAL"
  | "ACH"
  | "INTERNAL"
  | "ZELLE"
  | "BILLPAY";

export function calculateFee(
  type: PaymentType
) {
  switch (type) {
    case "WIRE_DOMESTIC":
      return 25;

    case "WIRE_INTERNATIONAL":
      return 45;

    case "ACH":
      return 0;

    case "INTERNAL":
      return 0;

    case "ZELLE":
      return 0;

    case "BILLPAY":
      return 0;

    default:
      return 0;
  }
}