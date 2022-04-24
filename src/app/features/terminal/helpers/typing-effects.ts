import { BehaviorSubject, Observable } from 'rxjs';

export function typeLettersOneByOne(fullText: string): Observable<string> {
  const subj$$ = new BehaviorSubject('');

  setTimeout(() => {
    typeNextLetterUntilEnd({
      text: '',
      fullText: `${fullText}`,
      subj$$,
    });
  });

  return subj$$;
}

function typeNextLetterUntilEnd({
  text,
  fullText,
  subj$$,
}: {
  text: string;
  fullText: string;
  subj$$: BehaviorSubject<string>;
}) {
  const nextChar = fullText.slice(text.length, text.length + 1);

  if (nextChar === '') {
    subj$$.complete();
  } else {
    const newText = fullText.slice(0, text.length + 1);
    subj$$.next(newText);
    const timeout = nextChar === ' ' ? 0 : 50;
    setTimeout(() => {
      typeNextLetterUntilEnd({
        text: newText,
        fullText,
        subj$$,
      });
    }, timeout);
  }
}
