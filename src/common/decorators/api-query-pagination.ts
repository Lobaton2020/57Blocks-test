import { ApiQuery } from '@nestjs/swagger';

export const ApiQueryLimit = () =>
  ApiQuery({
    required: false,
    name: 'limit',
  });
export const ApiQueryPage = () =>
  ApiQuery({
    required: false,
    name: 'page',
  });
