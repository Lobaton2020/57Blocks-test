import {
  ArgumentMetadata,
  ForbiddenException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { defaultPagination } from 'src/config/app';

@Injectable()
export class PaginationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(
    value: any,
    _metadata: ArgumentMetadata,
  ): { limit: number; page: number } {
    const defaultValue = defaultPagination;
    try {
      const limit = Number(value?.limit) || defaultValue.limit;
      const pageInit = Number(value?.page) || defaultValue.page;
      if (limit > defaultValue.limit) {
        throw new ForbiddenException(
          'limit value is too big than the max limit: ' + defaultValue.limit,
        );
      }
      const page = pageInit <= 0 ? 1 : pageInit;
      return { limit, page };
    } catch (error) {
      new Logger(PaginationPipe.name).error(error);
      throw new ForbiddenException(error.message);
    }
  }
}
