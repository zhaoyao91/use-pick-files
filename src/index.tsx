import { useCallback, useEffect, useRef } from 'react';

type Options = {
  multiple?: boolean;
  accept?: string;
};

export const usePickFiles = (
  defaultOptions: Options = {}
): ((options?: Options) => Promise<File[]>) => {
  const inputRef = useRef<any>();
  const resolveRef = useRef<any>();

  useEffect(() => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.classList.add('use-pick-files');
    input.style.display = 'none';

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
  }, []);

  return useCallback(
    (options: Options = {}) => {
      setupInput(inputRef.current, {
        accept: defaultOptions.accept,
        multiple: defaultOptions.multiple,
        ...options,
      });
      inputRef.current.click();
      return new Promise(resolve => {
        resolveRef.current = resolve;
      });
    },
    [inputRef, defaultOptions.accept, defaultOptions.multiple]
  );
};

function setupInput(
  input: HTMLInputElement,
  { accept, multiple }: Options = {}
) {
  if (multiple) {
    input.setAttribute('multiple', '');
  } else {
    input.removeAttribute('multiple');
  }

  if (accept) {
    input.setAttribute('accept', accept);
  } else {
    input.removeAttribute('accept');
  }
}
