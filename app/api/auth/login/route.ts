import { loginSchema } from "@/lib/validation/auth";
import {
  successResponse,
  errorResponse,
} from "@/lib/api/response";

import { loginUser } from "@/services/auth/login";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed =
      loginSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(
        "Validation failed",
        400,
        parsed.error.flatten().fieldErrors
      );
    }

    const user = await loginUser(
      parsed.data
    );

    return successResponse(
      user,
      "Login successful."
    );
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error.message
        : "Internal Server Error",
      401
    );
  }
}