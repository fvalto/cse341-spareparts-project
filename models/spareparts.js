module.exports = (mongoose) => {
  const SpareParts = mongoose.model(
    'spareparts',
    mongoose.Schema(
      {
        partNumber: String,
        description: String,
        brand: String,
        category: String,
        compatibleModels: Array,
        yearRange: String,
        stock: Number,
        price: Number,
        location: String,
      },
      { timestamps: true },
    ),
  );

  return SpareParts;
};
