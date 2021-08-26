#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import { getArguments } from "./arguments";
import { downloadImage } from "./image";
import { getPost } from "./post";
import { Arguments } from "./types/Arguments";
import { Post } from "./types/Post";

// get command line arguments
const argv = yargs(hideBin(process.argv)).parseSync();

// get arguments
const argsResult = getArguments(argv);

if (argsResult.error.error) {
  console.error(argsResult.error.message);
  process.exit(1);
}

const args = argsResult.data as Arguments;

// get post
const postPromise = getPost(args.id, args.token);

postPromise
  .then((postResult) => {
    if (postResult.error.error) {
      console.error(postResult.error.message);
      process.exit(1);
    }

    const post = postResult.data as Post;

    if (!fs.existsSync(path.resolve(args.id))) {
      fs.mkdirSync(path.resolve(args.id));
    }

    const downloadPromises = post.images.map((image) =>
      downloadImage(args.id, image)
    );

    Promise.allSettled(downloadPromises)
      .then((settlements) => {
        settlements.forEach((settlement) => {
          if (settlement.status === "fulfilled") {
            console.log(settlement.value.data);
          } else {
            console.error(settlement.reason.error.message);
          }
        });

        return settlements.map((settlement) => settlement.status);
      })
      .then((responses) => {
        const fulfilled = responses.filter(
          (response) => response === "fulfilled"
        ).length;

        console.log(
          `${fulfilled} out of ${post.images.length} images downloaded successfully.`
        );
      })
      .catch((error) => {
        console.error(
          "Unspecified error occurred downloading images. Error:",
          error
        );
        process.exit(1);
      });
  })
  .catch((error) => {
    console.error(
      "Unspecified error occurred retrieving post data. Error:",
      error
    );
    process.exit(1);
  });
