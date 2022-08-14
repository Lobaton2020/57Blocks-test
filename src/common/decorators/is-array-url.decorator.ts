import { buildMessage, isURL, ValidateBy } from 'class-validator';

export function validateUrlInArray(values: string[]) {
  if (typeof values != 'object') return false;
  return values.every((url) => isURL(url));
}

export function IsArrayUrl(field): PropertyDecorator {
  return ValidateBy({
    name: 'VALIDATION_URL_IN_ARRAY',
    constraints: [],
    validator: {
      validate: (value): boolean => validateUrlInArray(value),
      defaultMessage: buildMessage(
        () => `${field} must have all the items as a url type`,
      ),
    },
  });
}
