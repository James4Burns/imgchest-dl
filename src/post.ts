import axios from "axios";
import { postUrl } from "./config";
import { Post } from "./types/Post";
import { createResult, Result } from "./types/Result";

export const getPost = (
  id: string,
  token: string
): Promise<Result<Post | null>> => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const url = `${postUrl}/${id}`;

  const response = axios.get(url, config);

  return response
    .then((response) => createResult(false, "", response.data.data))
    .catch((error) =>
      createResult(true, `Error retrieving post data. Error: ${error}`, null)
    );
};
