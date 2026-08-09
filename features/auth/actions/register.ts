"use server";

import { registerCustomer } from "../services/register";

export async function registerAction(data: unknown) {
  try {
    const customer = await registerCustomer(data);

    return {
      success: true,
      customerId: customer.customerId,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Registration failed.",
    };
  }
}