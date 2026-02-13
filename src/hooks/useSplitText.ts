/**
 * useSplitText Hook
 * Split text into animated characters or words
 */

import { useMemo } from 'react';

type SplitType = 'chars' | 'words' | 'lines';

interface SplitTextResult {
  elements: string[];
  type: SplitType;
}

export function useSplitText(
  text: string,
  type: SplitType = 'chars',
): SplitTextResult {
  const elements = useMemo(() => {
    switch (type) {
      case 'chars':
        return text.split('');
      case 'words':
        return text.split(' ');
      case 'lines':
        return text.split('\n');
      default:
        return [text];
    }
  }, [text, type]);

  return { elements, type };
}
