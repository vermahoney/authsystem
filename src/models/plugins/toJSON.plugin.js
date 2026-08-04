const toJSON = (schema) => {
  schema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;

        Object.keys(schema.paths).forEach((path) => {
  if (schema.paths[path].options.private) {
    delete ret[path];
  }
});

    },
  });
};

export default toJSON;