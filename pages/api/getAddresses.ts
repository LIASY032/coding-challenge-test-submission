import type { NextApiRequest, NextApiResponse } from "next";

import generateMockAddresses from "../../src/utils/generateMockAddresses";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { postcode, streetnumber },
  } = req;

  if (!postcode || !streetnumber) {
    return res.status(400).send({
      status: "error",
      // DO NOT MODIFY MSG - used for grading
      errormessage: "Postcode and street number fields mandatory!",
    });
  }

  if (postcode.length < 4) {
    return res.status(400).send({
      status: "error",
      // DO NOT MODIFY MSG - used for grading
      errormessage: "Postcode must be at least 4 digits!",
    });
  }

  /** zh: 校验是否为全数字且非负; en: validate that input is all digits and non-negative */
  const isStrictlyNumeric = (value: string) => {
    return /^\d+$/.test(value);
  };

  /** zh: 各字段的数字校验错误消息; en: error messages for numeric validation per field */
  const FIELD_ERROR_MESSAGES: Record<"postcode" | "streetnumber", string> = {
    postcode: "Postcode must be all digits and non negative!",
    streetnumber: "Street Number must be all digits and non negative!",
  };

  /** zh: 返回字段的数字校验错误（无错误则为 null）; en: return field's numeric validation error (null if none) */
  const getNumericFieldError = (
    value: string,
    field: "postcode" | "streetnumber"
  ): string | null => {
    return isStrictlyNumeric(value) ? null : FIELD_ERROR_MESSAGES[field];
  };

  // zh: 合并校验两个字段，任一不通过则返回; en: validate both fields and short-circuit on first failure
  const firstNumericError =
    getNumericFieldError(postcode as string, "postcode") ||
    getNumericFieldError(streetnumber as string, "streetnumber");
  if (firstNumericError) {
    return res
      .status(400)
      .send({ status: "error", errormessage: firstNumericError });
  }

  const mockAddresses = generateMockAddresses(
    postcode as string,
    streetnumber as string
  );
  if (mockAddresses) {
    const timeout = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    // delay the response by 500ms - for loading status check
    await timeout(500);
    return res.status(200).json({
      status: "ok",
      details: mockAddresses,
    });
  }

  return res.status(404).json({
    status: "error",
    // DO NOT MODIFY MSG - used for grading
    errormessage: "No results found!",
  });
}
