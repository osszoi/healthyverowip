import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  ThemeProvider,
  Typography
} from '@mui/material';
import { Assets } from './components/Assets/Assets';
import { PlanCalculator } from './components/PlanCalculator/PlanCalculator';
import { Recipes } from './components/Recipes/Recipes';
import './index.css';
import { lightTheme } from './themes/light';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Container>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography
              variant='h4'
              sx={{ fontFamily: 'Adagio' }}>
              Assets
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Assets />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography
              variant='h4'
              sx={{ fontFamily: 'Adagio' }}>
              Calculadora
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <PlanCalculator />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography
              variant='h4'
              sx={{ fontFamily: 'Adagio' }}>
              Recetas
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Recipes />
          </AccordionDetails>
        </Accordion>
      </Container>
    </ThemeProvider>
  );
}

export default App;
