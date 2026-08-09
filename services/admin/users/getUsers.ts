import dbConnect from "@/lib/db/connect";
import { User } from "@/models/user/User";
import type { SortOrder } from "mongoose";
import type { AdminUser } from "@/types/admin/user.types";

interface GetUsersOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  role?: string;
  accountType?: string;
  sort?: "newest" | "oldest" | "lastLogin";
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface GetUsersResponse {
  data: AdminUser[];
  pagination: Pagination;
}

export async function getUsers({
  page = 1,
  limit = 20,
  search,
  status,
  role,
  accountType,
  sort = "newest",
}: GetUsersOptions): Promise<GetUsersResponse> {
  await dbConnect();

  const filter: Record<string, unknown> = {};

  if (status) {
    filter.status = status;
  }

  if (role) {
    filter.role = role;
  }

  if (accountType) {
    filter.accountType = accountType;
  }

  if (search) {
    filter.$or = [
      {
        firstName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
      {
        username: {
          $regex: search,
          $options: "i",
        },
      },
      {
        customerId: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

 

const sortOption: Record<string, SortOrder> =
  sort === "oldest"
    ? { createdAt: 1 as SortOrder }
    : sort === "lastLogin"
    ? { lastLogin: -1 as SortOrder }
    : { createdAt: -1 as SortOrder };

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),

    User.countDocuments(filter),
  ]);

  const data: AdminUser[] = users.map(
    (user) => ({
      id: user._id.toString(),

      customerId:
        user.customerId ?? "",

      username:
        user.username ?? "",

      firstName:
        user.firstName,

      lastName:
        user.lastName,

      fullName: `${user.firstName} ${user.lastName}`,

      email:
        user.email,

      phone:
        user.phone,

      role:
        user.role,

      status:
        user.status,

      accountType:
        user.accountType,

      emailStatus:
        user.emailStatus,

      phoneStatus:
        user.phoneStatus,

      twoFactorEnabled:
        user.twoFactorEnabled,

      failedLoginAttempts:
        user.failedLoginAttempts,

      lastLogin:
        user.lastLogin
          ? user.lastLogin.toISOString()
          : null,

      createdAt:
        user.createdAt.toISOString(),
    })
  );

  return {
    data,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit
      ),
    },
  };
}