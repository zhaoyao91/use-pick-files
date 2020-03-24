# use-pick-files

React hook which provides a `pickFiles` function to help you open a dialog to pick files.

## Install

```
npm install use-pick-files
```

```
yarn add use-pick-files
```

## Usage

```typescript jsx
import * as React from 'react';
import { usePickFiles } from 'use-pick-files';

const Demo = () => {
  const pickFiles = usePickFiles({ accept: 'image/*', multiple: true });
  return (
    <div>
      <button
        onClick={() => {
          pickFiles().then(files => {
            // `files` is an array of File instead of a FileList
            console.log(files);
          });
        }}
      >
        Pick Files
      </button>
    </div>
  );
};
```

## Options

- accept?: string
- multiple?: boolean

## License

[MIT](./LICENSE)
