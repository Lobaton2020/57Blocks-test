export default class Paginate {
  static build(results, currentPage, limit, total, page) {
    return {
      results,
      limit,
      total,
      currentPage,
      hasNext: total / limit > currentPage,
    };
  }
}
