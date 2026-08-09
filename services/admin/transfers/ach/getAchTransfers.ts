import connectDB from "@/lib/db/connect";

import AchTransfer from "@/models/ach/AchTransfer";

import {
  buildPagination,
  buildPaginationResponse,
  buildSort,
} from "../helpers";

import type {
  AdminTransfer,
  TransferQuery,
  TransferResult,
} from "../types";

export async function getAchTransfers(
  query: TransferQuery
): Promise<TransferResult<AdminTransfer[]>> {
  await connectDB();

  const {
    page = 1,
    limit = 20,
    status,
    search,
    reference,
    userId,
    accountId,
    minAmount,
    maxAmount,
    from,
    to,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const filter: Record<string, unknown> = {};

  if (status) {
    filter.status = status;
  }

  if (reference) {
    filter.reference = reference;
  }

  if (search) {
    filter.reference = {
      $regex: search,
      $options: "i",
    };
  }

  if (userId) {
    filter.requester = userId;
  }

  if (accountId) {
    filter.requesterAccount = accountId;
  }

  if (
    minAmount !== undefined ||
    maxAmount !== undefined
  ) {
    const amount: Record<string, number> = {};

    if (minAmount !== undefined) {
      amount.$gte = minAmount;
    }

    if (maxAmount !== undefined) {
      amount.$lte = maxAmount;
    }

    filter.amount = amount;
  }

  if (from || to) {
    const createdAt: Record<string, Date> = {};

    if (from) {
      createdAt.$gte = from;
    }

    if (to) {
      createdAt.$lte = to;
    }

    filter.createdAt = createdAt;
  }

  const { skip } = buildPagination({
    page,
    limit,
  });

  const sort = buildSort({
    sortBy,
    sortOrder,
  });

  const [data, total] = await Promise.all([
    AchTransfer.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    AchTransfer.countDocuments(filter),
  ]);

  const transfers: AdminTransfer[] =
    data.map((transfer) => ({
      id: transfer._id.toString(),

      _id: transfer._id.toString(),

      reference: transfer.reference,

      customerName: "Customer",

      recipientName:
        transfer.recipientName,

      type: "ACH",

      status: transfer.status,

      amount: transfer.amount,

      currency: "USD",

      createdAt:
        transfer.createdAt,

      updatedAt:
        transfer.updatedAt,

      fee:
        transfer.fee?.amount ?? 0,

      memo:
        transfer.memo ?? "",
    }));

  return {
    success: true,

    data: transfers,

    summary: {
      totalTransfers: total,

      totalVolume:
        transfers.reduce(
          (sum, transfer) =>
            sum + transfer.amount,
          0
        ),

      pendingTransfers:
        transfers.filter(
          (transfer) =>
            transfer.status ===
            "PENDING"
        ).length,

      processingTransfers:
        transfers.filter(
          (transfer) =>
            transfer.status ===
            "PROCESSING"
        ).length,

      completedTransfers:
        transfers.filter(
          (transfer) =>
            transfer.status ===
            "COMPLETED"
        ).length,

      failedTransfers:
        transfers.filter(
          (transfer) =>
            transfer.status ===
            "FAILED"
        ).length,

      cancelledTransfers:
        transfers.filter(
          (transfer) =>
            transfer.status ===
            "CANCELLED"
        ).length,
    },

    pagination:
      buildPaginationResponse(
        total,
        page,
        limit
      ),
  };
}