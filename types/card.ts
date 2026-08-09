export interface CardDto {
  id: string;

  holderName: string;

  last4: string;

  expiryMonth: number;

  expiryYear: number;

  network:
    | "VISA"
    | "MASTERCARD";

  type:
    | "DEBIT"
    | "CREDIT";

  status:
    | "ACTIVE"
    | "FROZEN"
    | "BLOCKED"
    | "EXPIRED";

  dailyLimit: number;

  atmEnabled: boolean;

  onlineEnabled: boolean;

  internationalEnabled: boolean;

  contactlessEnabled: boolean;

  virtual: boolean;

  color: string;
}