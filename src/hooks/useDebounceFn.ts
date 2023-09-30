import { useDebounceFn as useDebounceFnAHooks } from 'ahooks';

interface UseDebounceFn {
  callback: (data: any) => void;
  delay?: number;
}

export function useDebounceFn({ callback, delay = 200 }: UseDebounceFn) {
  const { run, cancel } = useDebounceFnAHooks(callback, {
    wait: delay
  });

  return { action: run, reset: cancel };
}
