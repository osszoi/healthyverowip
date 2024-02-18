import {
  DirectionsRun,
  DirectionsWalk,
  FitnessCenter,
  Grain,
  Hiking,
  LocalDining,
  LunchDining,
  SportsSoccer
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  DietType,
  PhysicalActivity,
  calculateMacronutrients
} from '../../core/calculator';

export const CalcCard = ({ label, value, style = 1 }) => {
  let sx = {};
  let sxv = {};

  if (style === 1) {
    sx = { backgroundColor: '#c9bfb8', color: '#7a675f' };
    sxv = { backgroundColor: '#ded8d4', color: '#7a675f' };
  }

  if (style === 2) {
    sx = { backgroundColor: '#5f8bb7', color: 'white' };
    sxv = { backgroundColor: '#9eb8d3', color: 'white' };
  }

  return (
    <Card sx={{ borderRadius: '20px', padding: '20px', ...sx }}>
      <Box sx={{ fontSize: '42px', textAlign: 'center' }}>{label}</Box>

      <Box
        sx={{
          fontSize: '52px',
          textAlign: 'center',
          borderRadius: '20px',
          fontWeight: 'bold',
          ...sxv
        }}>
        {value}
      </Box>
    </Card>
  );
};

export const PlanCalculator = () => {
  const [form, setForm] = useState<any>({
    age: null,
    weight: null,
    height: null,
    gender: 'Hombre',
    diet: DietType.Normal,
    pa: PhysicalActivity.Low
  });
  const [valid, setValid] = useState(false);

  const [results, setResults] = useState<any>();

  useEffect(() => {
    setValid(!!form.age && !!form.weight && !!form.height);
  }, [form]);

  const onCalculateMacronutrients = () => {
    setResults(
      calculateMacronutrients(
        Number(form.age),
        Number(form.weight),
        Number(form.height) > 3
          ? Number(form.height) / 100
          : Number(form.height),
        form.gender,
        form.diet,
        form.pa
      )
    );
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        rowSpacing={2}>
        <Grid
          item
          md={3}
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label='Edad'
            variant='standard'
            onChange={({ target: { value } }) =>
              setForm((p) => ({ ...p, age: value }))
            }
            type='number'
          />
        </Grid>

        <Grid
          item
          md={3}
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label='Peso (kg)'
            variant='standard'
            onChange={({ target: { value } }) =>
              setForm((p) => ({ ...p, weight: value }))
            }
            type='number'
          />
        </Grid>

        <Grid
          item
          md={3}
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label='Estatura (cm)'
            variant='standard'
            onChange={({ target: { value } }) =>
              setForm((p) => ({ ...p, height: value }))
            }
            type='number'
          />
        </Grid>

        <Grid
          item
          md={3}
          xs={12}
          sm={6}>
          <Autocomplete
            options={[{ label: 'Hombre' }, { label: 'Mujer' }]}
            defaultValue={{ label: 'Hombre' }}
            onChange={(_, value: any) => {
              setForm((p) => ({ ...p, gender: value.label }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Sexo'
                variant='standard'
              />
            )}
          />
        </Grid>

        <Grid item>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Tipo de dieta</span>
            <ToggleButtonGroup
              color='secondary'
              value={form.diet}
              exclusive
              onChange={(_, v) => {
                setForm((p) => ({ ...p, diet: v }));
              }}>
              <ToggleButton value={DietType.Keto}>
                <LocalDining sx={{ marginRight: 1 }} /> Keto
              </ToggleButton>

              <ToggleButton value={DietType.LowCarb}>
                <Grain sx={{ marginRight: 1 }} /> LowCarb
              </ToggleButton>

              <ToggleButton value={DietType.Normal}>
                <LunchDining sx={{ marginRight: 1 }} /> Normal
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Grid>

        <Grid item>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Nivel de actvidad física</span>
            <ToggleButtonGroup
              color='secondary'
              value={form.pa}
              exclusive
              onChange={(_, v) => {
                setForm((p) => ({ ...p, pa: v }));
              }}>
              <ToggleButton value={PhysicalActivity.Low}>
                <DirectionsWalk sx={{ marginRight: 1 }} /> Baja
              </ToggleButton>

              <ToggleButton value={PhysicalActivity.Moderate}>
                <DirectionsRun sx={{ marginRight: 1 }} /> Moderada
              </ToggleButton>

              <ToggleButton value={PhysicalActivity.High}>
                <FitnessCenter sx={{ marginRight: 1 }} /> Alta
              </ToggleButton>

              <ToggleButton value={PhysicalActivity.VeryHigh}>
                <Hiking sx={{ marginRight: 1 }} /> Muy alta
              </ToggleButton>

              <ToggleButton value={PhysicalActivity.Athlete}>
                <SportsSoccer sx={{ marginRight: 1 }} /> Profesional
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Grid>

        <Grid
          item
          xs={12}>
          <Button
            fullWidth
            disabled={!valid}
            variant='contained'
            onClick={onCalculateMacronutrients}>
            Calcular
          </Button>
        </Grid>
      </Grid>

      {!!results && (
        <>
          <Divider sx={{ marginTop: 3, marginBottom: 1 }}>Resultados</Divider>

          <Grid
            container
            spacing={3}>
            <Grid
              item
              md={4}
              flex={1}>
              <CalcCard
                label='Calorías'
                value={`${results.calories}`}
                style={2}
              />
            </Grid>

            <Grid
              item
              md={4}
              flex={1}>
              <CalcCard
                label='Proteínas'
                value={`${results.protein} gr`}
              />
            </Grid>

            <Grid
              item
              md={4}
              flex={1}>
              <CalcCard
                label='Carbohidratos'
                value={`${results.carb} gr`}
              />
            </Grid>

            <Grid
              item
              md={4}
              flex={1}>
              <CalcCard
                label='Grasas'
                value={`${results.fat} gr`}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
