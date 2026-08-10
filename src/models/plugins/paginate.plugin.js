const paginate = (schema) => {
  schema.statics.paginate = async function (filter, options) {
    let sort = "";

    // Sorting
    if (options.sortBy) {
      const sortingCriteria = [];

      options.sortBy.split(",").forEach((sortOption) => {
        const [key, order] = sortOption.split(":");

        sortingCriteria.push(
          (order === "desc" ? "-" : "") + key
        );
      });

      sort = sortingCriteria.join(" ");
    } else {
      sort = "createdAt";
    }

    // Limit
    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10;

    // Page
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;

    // Skip
    const skip = (page - 1) * limit;

    // Count total documents
    const countPromise = this.countDocuments(filter).exec();

    // Get documents for current page
    const docsPromise = this.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    // Run both queries in parallel
    const [totalResults, results] = await Promise.all([
      countPromise,
      docsPromise,
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalResults / limit);

    // Return pagination result
    return {
      results,
      page,
      limit,
      totalPages,
      totalResults,
    };
  };
};

export default paginate;