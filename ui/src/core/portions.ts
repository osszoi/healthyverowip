import { DietType } from './calculator';

const getMilkVegetableFruitPortions = (diet: DietType, calories: number) => {
  const food_list = {
    milk: {
      amount: diet !== DietType.Normal ? 0 : 1,
      carbs: 12,
      proteins: 8,
      fat: 2.4
    },
    vegetables: {
      amount: diet !== DietType.Normal ? 2 : 5,
      carbs: 5,
      proteins: 2,
      fat: 0
    },
    fruits: {
      amount: diet !== DietType.Normal ? 0 : 2,
      carbs: 15,
      proteins: 0,
      fat: 0
    }
  };

  // Limits
  if (diet === DietType.Normal) {
    if (calories > 3000) {
      food_list.milk.amount = 2;
      food_list.fruits.amount = 4;
    }
  }

  return food_list;
};

export const calculatePortions = (
  calories: number,
  carbs: number,
  fat: number,
  proteins: number,
  diet: DietType
) => {
  const milkVegetablesFruits = getMilkVegetableFruitPortions(diet, calories);

  const subtotals_others = {
    carbs: Object.values(milkVegetablesFruits).reduce(
      (acc, item) => acc + item.carbs * item.amount,
      0
    ),
    proteins: Object.values(milkVegetablesFruits).reduce(
      (acc, item) => acc + item.proteins * item.amount,
      0
    ),
    fat: Object.values(milkVegetablesFruits).reduce(
      (acc, item) => acc + item.fat * item.amount,
      0
    )
  };

  const portions_almidones = Math.round(
    (carbs - subtotals_others.carbs) / 15 - 0.05
  );

  const almidones_proteins = portions_almidones * 2 + subtotals_others.proteins;
  const almidones_fat = portions_almidones * 1 + subtotals_others.fat;
  const almidones_carbs = portions_almidones * 15 + subtotals_others.carbs;

  // Proteins
  const portions_proteins = Math.round(
    (proteins - almidones_proteins) / 7 - 0.05
  );
  const proteins_fat = portions_proteins * 3 + almidones_fat;
  const proteins_carbs = almidones_carbs;

  // Fats
  let portions_fat = (fat - proteins_fat) / 5 - 0.05;
  // const fat_fat = portions_fat * 5 + proteins_fat;

  if (portions_fat < 4) {
    portions_fat = Math.ceil(portions_fat);
  } else {
    portions_fat = Math.round(portions_fat);
  }

  const totals = {
    milk: milkVegetablesFruits.milk.amount,
    fruits: milkVegetablesFruits.fruits.amount,
    vegetables: milkVegetablesFruits.vegetables.amount,
    almidones: portions_almidones,
    proteinas: portions_proteins,
    grasas: portions_fat,
    total_gr_proteins: portions_proteins * 7 + almidones_proteins,
    total_gr_carbs: proteins_carbs,
    total_gr_grasas: portions_fat * 5 + proteins_fat
  };

  return totals;
};
