import UserTransferLimits from "@/models/user/UserTransferLimits";

export async function getUserTransferLimits(
  user: string
) {
  return UserTransferLimits.findOne({
    user,
  });
}