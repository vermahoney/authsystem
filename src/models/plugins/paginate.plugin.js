const paginate = (schema) => {
  schema.statics.paginate = async function (
    filter,
    options
  ) {
     let sort = "";

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
  };
};

export default paginate;