const calculateQuizResult = (services, hourlyBudget, preferredFeatures) => {
  const newScores = {};
  console.log("test", services, preferredFeatures);
  services.forEach((service) => {
    let score = 0;
    if (service.price <= hourlyBudget) {
      score++;
    }
    service.features.forEach((feature) => {
      if (preferredFeatures.includes(feature.detail)) {
        score++;
        console.log("found");
      }
    });

    if (service.price > hourlyBudget) {
      score = score - 2;
    }
    newScores[service.service_title] = score;
  });

  const recommendedService = services.reduce((prev, current) =>
    newScores[prev.service_title] > newScores[current.service_title]
      ? prev
      : current
  );

  const unrecommendedServices = services.filter(
    (service) => service.service_title !== recommendedService.service_title
  );

  return { newScores, recommendedService, unrecommendedServices };
};

export { calculateQuizResult };
