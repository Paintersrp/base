const calculateQuizResult = (services, hourlyBudget, preferredFeatures) => {
  const newScores = {};
  console.log("test", services);
  services.forEach((service) => {
    let score = 0;
    if (service.price <= hourlyBudget) {
      score++;
    }
    service.features.forEach((feature) => {
      if (preferredFeatures.includes(feature)) {
        score++;
      }
    });
    newScores[service.title] = score;
  });

  const recommendedService = services.reduce((prev, current) =>
    newScores[prev.title] > newScores[current.title] ? prev : current
  );

  const unrecommendedServices = services.filter(
    (service) => service.title !== recommendedService.title
  );

  return { newScores, recommendedService, unrecommendedServices };
};

export { calculateQuizResult };
