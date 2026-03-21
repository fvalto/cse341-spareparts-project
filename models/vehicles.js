module.exports = (mongoose) => {
  const Vehicles = mongoose.model(
    'vehicles',
    mongoose.Schema(
      {
        brand: String,
        modelName: String,
        engine: String,
        carrossery: String,
        fuelType: String,
        countryOfOrigin: String,
      },
      { timestamps: true },
    ),
  );

  return Vehicles;
};
