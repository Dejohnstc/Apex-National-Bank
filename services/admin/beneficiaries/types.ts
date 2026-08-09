export type BeneficiaryType =
  | "INTERNAL"
  | "DOMESTIC"
  | "INTERNATIONAL";

export type BeneficiaryStatus =
  | "ACTIVE"
  | "DISABLED"
  | "PENDING";

export interface AdminBeneficiary {
  id: string;

  userId: string;

  accountId?: string;

  fullName: string;

  bankName: string;

  accountNumber: string;

  routingNumber?: string;

  swiftCode?: string;

  iban?: string;

  email?: string;

  phone?: string;

  country: string;

  currency: string;

  type: BeneficiaryType;

  status: BeneficiaryStatus;

  createdAt: Date;

  updatedAt: Date;
}

export interface BeneficiarySummary {
  totalBeneficiaries: number;

  activeBeneficiaries: number;

  pendingBeneficiaries: number;

  disabledBeneficiaries: number;
}

export interface Pagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface GetBeneficiariesParams {
  page?: number;

  search?: string;

  type?: BeneficiaryType;

  status?: BeneficiaryStatus;

  sort?: string;
}

export interface GetBeneficiariesResponse {
  data: AdminBeneficiary[];

  summary: BeneficiarySummary;

  pagination: Pagination;
}