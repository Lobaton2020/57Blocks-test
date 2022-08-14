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
  transform(value: any, _metadata: ArgumentMetadata) {
    const defaultValue = defaultPagination;
    try {
      const limit = Number(value?.limit) || defaultValue.limit;
      const skip = Number(value?.skip) || defaultValue.skip;
      if (limit > defaultValue.limit) {
        throw new ForbiddenException(
          'limit value is too big than the max limit: ' + defaultValue.limit,
        );
      }
      return { limit, skip };
    } catch (error) {
      new Logger(PaginationPipe.name).error(error);
      throw new ForbiddenException(error.message);
    }
  }
}
