import { isNumber, isString } from "./type";


function toString(value: number) {
  return value + '';
}
export const toEn = (persianNumber : string) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  let englishNumber = "";
  
  for (let i = 0; i < persianNumber.length; i++) {
    const char = persianNumber.charAt(i);
    const index = persianDigits.indexOf(char);
    
    if (index !== -1) {
      englishNumber += index;
    } else {
      englishNumber += char;
    }
  }
  
  return englishNumber;
}


export function toFa(input?: string | number | null): string {
  if (!(isNumber(input) || isString(input))) {
    return '';
  }
  return (input + '').replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}

export function toCurrency(value?: number | string, isToman = false) {
  if (value === undefined) {
    return '';
  }
  let price = Number(toEn(value?.toString()?.replace?.(/,/g, '')));

  if (isNaN(price)) {
    return '۰';
  }
  if (!isToman) {
    price = Math.floor(price / 10);
  }
  let priceText = String(price).replace(/\$|,/g, '');
  for (let i = 0; i < Math.floor((priceText.length - (1 + i)) / 3); i++) {
    priceText =
      priceText.substring(0, priceText.length - (4 * i + 3)) +
      ',' +
      priceText.substring(priceText.length - (4 * i + 3));
  }

  return priceText;
}

export const toFaCurrency = (value?: number | string, isToman = false) => {
  return toFa(toCurrency(value, isToman));
};