import { useCallback, useEffect, useRef } from 'react';

type Options = {
  multiple?: boolean;
  accept?: string;
};

export const usePickFiles = ({
  multiple,
  accept,
}: Options = {}): (() => Promise<File[]>) => {
  const inputRef = useRef<any>();
  const resolveRef = useRef<any>();

  useEffect(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.classList.add('use-pick-files');
    input.style.display = 'none';
    if (multiple) input.setAttribute('multiple', '');
    if (accept) input.setAttribute('accept', accept);
    input.addEventListener('change', e => {
      // @ts-ignore
      resolveRef.current?.(Array.from(e.target.files));
      input.value = '';
    });

    document.body.appendChild(input);

    inputRef.current = input;

    return () => {
      document.body.removeChild(input);
    };
  }, [multiple, accept]);

  return useCallback(() => {
    inputRef.current.click();
    return new Promise(resolve => {
      resolveRef.current = resolve;
    });
  }, [inputRef]);
};
