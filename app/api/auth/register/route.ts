import { registerSchema } from "@/lib/validation/auth";
import {
  successResponse,
  errorResponse,
} from "@/lib/api/response";
import { registerUser } from "@/services/auth/register";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(
        "Validation failed",
        400,
        parsed.error.flatten().fieldErrors
      );
    }

    const result = await registerUser(parsed.data);

    return successResponse(
      result,
      "Account created successfully. Please verify your email.",
      201
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      error instanceof Error
        ? error.message
        : "Internal Server Error",
      500
    );
  }
}