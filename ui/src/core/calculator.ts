import { calculatePortions } from './portions';

export enum DietType {
  Keto,
  LowCarb,
  Normal
}

export enum PhysicalActivity {
  Low,
  Moderate,
  High,
  VeryHigh,
  Athlete
}

const physicalActivityMultipliers = {
  [PhysicalActivity.Low]: 1.2,
  [PhysicalActivity.Moderate]: 1.3751,
  [PhysicalActivity.High]: 1.55,
  [PhysicalActivity.VeryHigh]: 1.725,
  [PhysicalActivity.Athlete]: 1.9
};

export const DIETS = {
  [DietType.Keto]: {
    max_carb: 50,
    min_fat: 0.4
  },
  [DietType.LowCarb]: {
    max_carb: 100,
    min_fat: 0.4
  },
  [DietType.Normal]: {
    min_carb: 0.4,
    max_carb: 0.6,
    min_fat_percentage: 0.3,
    max_fat_percentage: 0.35
  }
};

export interface Macronutrients {
  fat: number;
  protein: number;
  carb: number;
  calories?: number;
}

function calcLowCarb(
  rct: number,
  west: number,
  diet: DietType.LowCarb | DietType.Keto = DietType.LowCarb
): Macronutrients {
  console.log({ rct, west, diet });
  let min_fat = DIETS[diet].min_fat;

  let grasas = rct * min_fat;

  const proteinas_20 = (rct * 0.2) / 4;
  const proteinas_30 = (rct * 0.3) / 4;

  // const proteinas_1_5 = west * 1.5;
  const proteinas_2_0 = west * 2;

  let proteinas: number;

  if (proteinas_2_0 > proteinas_20 && proteinas_2_0 < proteinas_30) {
    proteinas = proteinas_2_0;
  } else if (proteinas_2_0 >= proteinas_30) {
    proteinas = proteinas_30;
  } else {
    proteinas = proteinas_20;
  }

  proteinas *= 4;

  const carb = DIETS[diet].max_carb * 4;

  while (grasas + proteinas + carb < rct) {
    min_fat += 0.0001;
    grasas = rct * min_fat;
  }

  return {
    fat: grasas,
    protein: proteinas,
    carb: carb
  };
}

function calcKeto(rct: number, west: number): Macronutrients {
  return calcLowCarb(rct, west, DietType.Keto);
}

function calcNormal(rct: number, west: number): Macronutrients {
  const min_fat = DIETS[DietType.Normal].min_fat_percentage;
  // const max_fat = DIETS[DietType.Normal].max_fat_percentage;

  const grasas = rct * min_fat;

  const proteinas_20 = (rct * 0.2) / 4;
  const proteinas_30 = (rct * 0.3) / 4;

  // const proteinas_1_5 = west * 1.5;
  const proteinas_2_0 = west * 2;

  let proteinas: number;

  if (proteinas_2_0 > proteinas_20 && proteinas_2_0 < proteinas_30) {
    proteinas = proteinas_2_0;
  } else if (proteinas_2_0 >= proteinas_30) {
    proteinas = proteinas_30;
  } else {
    proteinas = proteinas_20;
  }

  proteinas *= 4;

  const prot_percentage = proteinas / rct;

  // const carb_min = DIETS[DietType.Normal].min_carb;
  // const carb_max = DIETS[DietType.Normal].max_carb;
  // const carb_3 = west * 3;
  // const carb_5 = west * 5;

  const carb = (1 - prot_percentage - min_fat) * rct;

  return {
    fat: grasas,
    protein: proteinas,
    carb: carb
  };
}

export const calculateMacronutrients = (
  age: number,
  weight: number,
  height: number,
  gender: string,
  diet: DietType,
  pa: PhysicalActivity
): Macronutrients => {
  console.log({ age, weight, height, gender, pa, diet });
  let west = 0;
  if (gender === 'Hombre') {
    west = height * height * 22.4;
  } else if (gender === 'Mujer') {
    west = height * height * 20.9;
  }

  let broka = 0;

  if (gender === 'Hombre') {
    broka = height < 1.52 ? (height * 100 - 100) * 0.9 : west;
  } else if (gender === 'Mujer') {
    broka = height < 1.52 ? (height * 100 - 100) * 0.85 : west;
  }

  // Calculo IMC
  // const imc = weight / (height * height)

  // Calculo RCB
  let rcb = 0;

  if (gender === 'Hombre') {
    rcb = 66.47 + 13.75 * broka + 5 * height * 100 - 6.76 * age;
  } else {
    rcb = 655.1 + 9.56 * broka + 1.85 * height * 100 - 4.68 * age;
  }

  // Calculo RCT
  const rct = rcb * physicalActivityMultipliers[pa] * 1.06;

  // Calculos finales
  let results: Macronutrients = {} as Macronutrients;
  console.log({ diet });
  if (diet === DietType.LowCarb) results = calcLowCarb(rct, west);
  else if (diet === DietType.Keto) results = calcKeto(rct, west);
  else if (diet === DietType.Normal) results = calcNormal(rct, west);

  const { protein, carb, fat } = results;

  return {
    protein: Number((protein / 4).toFixed(0)),
    carb: Number((carb / 4).toFixed(0)),
    fat: Number((fat / 9).toFixed(0)),
    calories: Number((protein + carb + fat).toFixed(0))
  };
};

export const calculate = (
  age: number,
  weight: number,
  height: number,
  gender: string,
  diet: DietType,
  pa: PhysicalActivity
) => {
  const macronutrients = calculateMacronutrients(
    age,
    weight,
    height,
    gender,
    diet,
    pa
  );

  const portions = calculatePortions(
    macronutrients.calories || 0,
    macronutrients.carb,
    macronutrients.fat,
    macronutrients.protein,
    diet
  );

  return {
    macronutrients,
    portions
  };
};
