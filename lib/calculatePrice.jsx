export function calculatePrice(from, to, weight) {
  if (from === to) {
    throw new Error("Origin and Destination cannot be the same.");
  }

  if (!weight || isNaN(weight)) {
    throw new Error("Invalid weight.");
  }

  if (weight < 10) {
    throw new Error("Minimum weight is 10kg.");
  }

  let rate = 0;

  if (from === "nigeria" && to === "uk") {
    rate = 9000;
  } else if (from === "uk" && to === "nigeria") {
    rate = 6;
  } else {
    throw new Error("Invalid route.");
  }

  return rate * weight;
}
