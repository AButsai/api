import { NotFoundException } from '@nestjs/common';

export const checkEnumExist = <T>(value: string, enumType: T) => {
  if (value === undefined) {
    return true;
  }
  const valueToEnum = Object.values(enumType);

  const isValueToEnum = valueToEnum.includes(value as unknown);

  if (!isValueToEnum) {
    throw new NotFoundException(`This ${value} is not on ${valueToEnum}`);
  }
};
