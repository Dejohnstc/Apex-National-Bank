import { Parser } from "@json2csv/plainjs";

import { getTransactions } from "./getTransactions";

export async function exportTransactions() {
  const result =
    await getTransactions({
      limit: 100000,
    });

  const parser = new Parser();

  return parser.parse(result.data);
}