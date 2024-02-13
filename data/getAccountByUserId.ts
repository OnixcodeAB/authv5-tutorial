import Accounts from "@/mongo/schemas/Account";

export const getAccountByUserId = async (id: string) => {
  try {
    const account = await Accounts.findOne({"account.userId":id})
    return account;
  } catch {
    return null;
  }
};
