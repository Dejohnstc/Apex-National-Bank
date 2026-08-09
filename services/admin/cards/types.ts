export type CardStatus =
  | "ACTIVE"
  | "FROZEN"
  | "BLOCKED"
  | "EXPIRED";

export type CardNetwork =
  | "VISA"
  | "MASTERCARD";

export type CardType =
  | "DEBIT"
  | "CREDIT";

export interface AdminCard {
  id: string;

  holderName: string;

  cardNumber: string;

  last4: string;

  expiryMonth: number;

  expiryYear: number;

  network: CardNetwork;

  type: CardType;

  status: CardStatus;

  dailyLimit: number;

  atmEnabled: boolean;

  onlineEnabled: boolean;

  contactlessEnabled: boolean;

  internationalEnabled: boolean;

  virtual: boolean;

  color: string;

  createdAt: Date;

  updatedAt: Date;
}

export interface CardSummary {
  totalCards: number;

  activeCards: number;

  frozenCards: number;

  virtualCards: number;
}

export interface Pagination {
  page: number;

  totalPages: number;

  total: number;

  limit: number;
}

export interface GetCardsResponse {
  data: AdminCard[];

  summary: CardSummary;

  pagination: Pagination;
}

export interface GetCardsParams {
  page?: number;

  search?: string;

  status?: CardStatus;

  type?: CardType;

  network?: CardNetwork;

  virtual?: boolean;

  sort?: string;
}