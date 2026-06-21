import { useEffect } from 'react';
import SplitType from 'split-type';

export function useSplitType(
  selector: string = '.split-text',
  options?: { types?: string; lineClass?: string; wordClass?: string; charClass?: string }
) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    const instances: SplitType[] = [];

    elements.forEach((el) => {
      const instance = new SplitType(el, {
        types: options?.types ?? 'lines,words,chars',
        lineClass: options?.lineClass ?? 'split-line',
        wordClass: options?.wordClass ?? 'split-word',
        charClass: options?.charClass ?? 'split-char',
      });
      instances.push(instance);
    });

    return () => {
      instances.forEach((instance) => instance.revert());
    };
  }, [selector]);
}
