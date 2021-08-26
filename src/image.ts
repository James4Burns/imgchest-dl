import axios from "axios";
import fs from "fs";
import path from "path";
import { Image } from "./types/Image";
import { createResult, Result } from "./types/Result";

export const downloadImage = (
  id: string,
  image: Image
): Promise<Result<string | null>> => {
  return new Promise<Result<string | null>>((resolve, reject) => {
    const fileName = path.join(
      id,
      `${image.position}.${image.link.split(".").pop()}`
    );

    const downloadPromise = axios.get(image.link, { responseType: "stream" });

    downloadPromise
      .then((response) => {
        response.data
          .pipe(fs.createWriteStream(fileName))
          .on("finish", () =>
            resolve(
              createResult(
                false,
                "",
                `Image #${image.position} finished successfully.`
              )
            )
          )
          .on("error", (error: Error) =>
            reject(
              createResult(
                true,
                `Error writing image #${image.position}: ${error}`,
                null
              )
            )
          );
      })
      .catch((error) =>
        reject(
          createResult(
            true,
            `Error downloading image #${image.position}: ${error}`,
            null
          )
        )
      );
  });
};
