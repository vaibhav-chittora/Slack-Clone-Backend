export default function crudRepository(model) {
  return {
    create: async function (data) {
      const newDoc = await model.create(data);
      return newDoc;
    },
    getAll: async function () {
      const allDocs = await model.find();
      return allDocs;
    },
    getById: async function (id) {
      const doc = await model.findById(id);
      return doc;
    },
    update: async function (id, data) {
      const updatedResponse = await model.findByIdAndUpdate(id, data, {
        new: true
      });
      return updatedResponse;
    },
    delete: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    }
  };
}
