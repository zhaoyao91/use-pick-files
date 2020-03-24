import * as React from 'react';
import { usePickFiles } from '../src';

export default {
  title: 'use-pick-files',
};

export const Default = () => {
  const pickFile = usePickFiles({ accept: 'image/*', multiple: true });
  return (
    <div>
      <button
        onClick={() => {
          pickFile().then(files => console.log(files));
        }}
      >
        选择文件
      </button>
    </div>
  );
};
