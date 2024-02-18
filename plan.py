import random

# Diets
diets = {
    'Keto': {
        'max_carb': 50,
        'min_fat': 0.4
    },
    'LowCarb': {
        'max_carb': 100,
        'min_fat': 0.4
    },
    'Normal': {
        'min_carb': 0.4,
        'max_carb': 0.6,
        'min_fat_percentage': 0.3,
        'max_fat_percentage': 0.35,
    }
}

# Datos de Jorge García
age = 37
weight = 88  # kg
height = 1.79  # m
gender = 'Hombre'
pa = 'MF' # L M F MF YUCA
diet = 'Normal' # Keto, LowCarb, Normal

def calcLowCarb(rct, west, diet):
  min_fat = diets[diet]['min_fat']

  # Grasas
  grasas = rct * min_fat

  # Proteinas
  proteinas_20 = rct * 0.2 / 4
  proteinas_30 = rct * 0.3 / 4

  proteinas_1_5 = west * 1.5
  proteinas_2_0 = west * 2

  # Siempre me quedo MAXIMO el 2.0 (si esta en rango)
  if proteinas_2_0 > proteinas_20 and proteinas_2_0 < proteinas_30:
      proteinas = proteinas_2_0
  # Si Las proteinas 2.0 son mayores al 30%, me quedo con el 30%
  elif proteinas_2_0 >= proteinas_30:
      proteinas = proteinas_30
  # Si las 2.0 son menores al 20%, me quedo con el 20%
  elif proteinas_2_0 <= proteinas_20:
      proteinas = proteinas_20

  proteinas = proteinas * 4


  # Carbohidratos
  carb = diets[diet]['max_carb'] * 4


  while grasas + proteinas + carb < rct:
      min_fat += 0.0001
      grasas = rct * min_fat

  return {
    'fat': grasas,
    'protein': proteinas,
    'carb': carb
  }

def calcKeto(rct, west, diet):
  min_fat = diets[diet]['min_fat']

  # Grasas
  grasas = rct * min_fat

  # Proteinas
  proteinas_20 = rct * 0.2 / 4
  proteinas_30 = rct * 0.3 / 4

  proteinas_1_5 = west * 1.5
  proteinas_2_0 = west * 2

  # Siempre me quedo MAXIMO el 2.0 (si esta en rango)
  if proteinas_2_0 > proteinas_20 and proteinas_2_0 < proteinas_30:
      proteinas = proteinas_2_0
  # Si Las proteinas 2.0 son mayores al 30%, me quedo con el 30%
  elif proteinas_2_0 >= proteinas_30:
      proteinas = proteinas_30
  # Si las 2.0 son menores al 20%, me quedo con el 20%
  elif proteinas_2_0 <= proteinas_20:
      proteinas = proteinas_20

  proteinas = proteinas * 4


  # Carbohidratos
  carb = diets[diet]['max_carb'] * 4


  while grasas + proteinas + carb < rct:
      min_fat += 0.0001
      grasas = rct * min_fat

  return {
    'fat': grasas,
    'protein': proteinas,
    'carb': carb
  }

def calcNormal(rct, west, diet):
  min_fat = diets[diet]['min_fat_percentage']
  max_fat = diets[diet]['max_fat_percentage']

  # # Grasas
  grasas = rct * min_fat

  # Proteinas
  proteinas_20 = rct * 0.2 / 4
  proteinas_30 = rct * 0.3 / 4

  proteinas_1_5 = west * 1.5
  proteinas_2_0 = west * 2

  # Siempre me quedo MAXIMO el 2.0 (si esta en rango)
  if proteinas_2_0 > proteinas_20 and proteinas_2_0 < proteinas_30:
      proteinas = proteinas_2_0
  # Si Las proteinas 2.0 son mayores al 30%, me quedo con el 30%
  elif proteinas_2_0 >= proteinas_30:
      proteinas = proteinas_30
  # Si las 2.0 son menores al 20%, me quedo con el 20%
  elif proteinas_2_0 <= proteinas_20:
      proteinas = proteinas_20

  proteinas = proteinas * 4


  # Carbohidratos
  prot_percentage = (proteinas) / rct

  carb_min = diets['Normal']['min_carb']
  carb_max = diets['Normal']['max_carb']
  carb_3 = west * 3
  carb_5 = west * 5

  carb = (1 - prot_percentage - min_fat) * rct


  # while grasas + proteinas + carb < rct:
  #     min_fat += 0.0001
  #     grasas = rct * min_fat

  return {
    'fat': grasas,
    'protein': proteinas,
    'carb': carb
  }

def calc(age, weight, height, gender, pa, diet):
    # Calculo el west (weight ideal)
    west = 0
    if gender == 'Hombre':
        west = height * height * 22.4
    if gender == 'Mujer':
        west = height * height * 20.9

    # Calculo el broka
    broka = 0

    if gender == 'Hombre':
        if height < 1.52:
            broka = ((height * 100) - 100) * 0.9
        else:
            broka = west

    if gender == 'Mujer':
        if height < 1.52:
            broka = ((height * 100) - 100) * 0.85
        else:
            broka = west

    # Calculo IMC
    imc = weight / (height * height)

    # Calculo RCB
    rcb = 0

    if gender == 'Hombre':
      rcb = 66.47 + 13.75 * broka + 5 * height * 100 - 6.76 * age
    else:
      rcb = 655.1 + 9.56 * broka + 1.85 * height * 100 - 4.68 * age

    # Calculo RCT
    rct = 0

    if pa == 'L':
        rct = rcb * 1.2
    if pa == 'M':
        rct = rcb * 1.375
    if pa == 'F':
        rct = rcb * 1.55
    if pa == 'MF':
        rct = rcb * 1.725
    if pa == 'YUCA':
      rct = rcb * 1.9

    rct = rct * 1.06

    # Calculos finales
    results = {}

    if diet == 'LowCarb':
        results = calcLowCarb(rct, west, diet)
    elif diet == 'Keto':
        results = calcKeto(rct, west, diet)
    elif diet == 'Normal':
        results = calcNormal(rct, west, diet)

    print("Diet:", diet, "-- Actvidad fisica:", pa)
    print("Calorias (RCT):", round(rct))
    print("Grasas:", round(results['fat'] / 9), "gr")
    print("Proteinas:", round(results['protein'] / 4), "gr")
    print("Carb:", round(results['carb'] / 4), "gr")
    print("Total:", round(results['fat'] + results['protein'] + results['carb']), "calorias")
    print('')
    print('')
    print('')

calc(age, weight, height, gender, 'L', diet)
calc(age, weight, height, gender, 'M', diet)
calc(age, weight, height, gender, 'F', diet)
calc(age, weight, height, gender, 'MF', diet)
calc(age, weight, height, gender, 'YUCA', diet)
