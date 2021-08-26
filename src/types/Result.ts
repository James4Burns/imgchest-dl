export type Result<T> = { error: { error: boolean; message: string }; data: T };

export const createResult = (
  error: boolean,
  message: string,
  data: any
): Result<typeof data> => {
  return { error: { error, message }, data };
};
