# imgchest-dl

imgchest-dl is a Node.js program for downloading albums from Image Chest [https://imgchest.com].

## Prerequisites

imgchest-dl was designed to run using the following software:

- [Node.js](https://github.com/nodejs/node)
- [Yarn](https://github.com/yarnpkg/yarn)

It is highly recommended that you install Node.js through a version manager such as [nvm](https://github.com/nvm-sh/nvm).

You will also need an Image Chest API token. First, create an account at [Image Chest](https://imgchest.com), then go to Profile -> Security, and click **New Token** under **Personal Access Tokens**. You won't be able to see your token after you create it, so record it somewhere. If you forget, you can always delete and recreate your token.

## Installation

Use git to clone this repository.

```
git clone https://github.com/james4burns/imgchest-dl
```

Use yarn to install the required dependencies.

```
yarn
```

Run the build script to build the project.

```
yarn run build
```

## Usage

```
node build/imgchest-dl.js [OPTIONS] ID
```

## Options

```
    Token:
        --token                 Token to access the Image Chest API
        --tokenFile             Path to file containing token to access the Image Chest API

    A token is required to access the API.
    You may also set an environment variable named TOKEN containing the token.
    The program prioritizes the token argument first, then the token file argument,
    before finally looking at the TOKEN environment variable.
```

## License

```
MIT License

Copyright (c) 2021 James Burns

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
