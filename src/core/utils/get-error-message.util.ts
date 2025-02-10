import { errorMessages } from '../errors/constants/error-messages';

export const getErrorMessage = (
  code: string, 
  replaces: string[] = [], 
  lang: keyof typeof errorMessages = 'es'
): string => {
  let errorMsg = errorMessages[lang][code as keyof typeof errorMessages[typeof lang]];
  
  if (errorMsg) {
    replaces.forEach((value, index) => {
      errorMsg = errorMsg.replace(`$${index}`, value);
    });
    return errorMsg;
  }
  
  return errorMessages[lang].defaultError;
}; 