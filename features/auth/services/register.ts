import { Customer } from "../model/Customer";
import { registerSchema } from "../validators/register";

import { connectDB } from "@/lib/db/mongodb";
import { hashPassword } from "@/lib/auth/password";
import { generateCustomerId } from "@/lib/utils/generate-customer-id";

export async function registerCustomer(input: unknown) {
  await connectDB();

  const data = registerSchema.parse(input);

  const existingCustomer = await Customer.findOne({
    $or: [
      { email: data.email },
      { username: data.username },
    ],
  });

 if (existingCustomer) {
  return {
    success: false,
    message: "Email or username already exists.",
  };
}
  const passwordHash = await hashPassword(data.password);

  const customer = await Customer.create({
    customerId: generateCustomerId(),

    firstName: data.firstName,
    lastName: data.lastName,

    username: data.username,
    email: data.email,
    phone: data.phone,

    passwordHash,
  });

  return customer;
}