import fs from "fs";
import path from "path";
import { tokenEnv } from "./config";
import { Arguments } from "./types/Arguments";
import { createResult, Result } from "./types/Result";

export const getArguments = (argv: any): Result<Arguments | null> => {
  if (!argv || !argv._ || argv._.length === 0) {
    return createResult(true, "No post ID provided.", null);
  }

  const id = argv._[0] as string;
  const tokenResult = getToken(argv.token, argv.tokenFile);

  if (tokenResult.error.error) {
    return createResult(
      tokenResult.error.error,
      tokenResult.error.message,
      null
    );
  }

  const token = tokenResult.data;

  return createResult(false, "", { id, token });
};

const getToken = (
  token: string | null,
  file: string | null
): Result<string | null> => {
  if (token && token.length !== 0) {
    return createResult(false, "", token);
  } else if (file && file.length !== 0) {
    const data = fs.readFileSync(path.resolve(file), {
      encoding: "utf8",
    });

    if (data.length === 0) {
      return createResult(true, "Error while reading token file.", null);
    }

    return createResult(false, "", data);
  } else if (tokenEnv && tokenEnv.length !== 0) {
    return createResult(false, "", tokenEnv);
  }

  return createResult(true, "No API token provided.", null);
};
