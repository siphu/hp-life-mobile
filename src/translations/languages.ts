import {Language} from '~/utils/dict';

export function getLanguageNameFromCode(code?: string): string | undefined {
  if (!code) return undefined;
  else if (code in Language) return Language[code];
  throw new Error(`'${code}' is not a valid language code`);
}

export function getLanguageCodeFromName(name: string): string {
  let code = Object.keys(Language).find((l: string) => Language[l] === name);
  if (code) return code;
  throw new Error(`'${name}' is not a valid language`);
}
