import { FitnessCenter, LocalFireDepartment } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Typography
} from '@mui/material';
import { useState } from 'react';

interface Recipe {
  image: string;
  title: string;
  shortDescription: string;
  fullRecipe: string;
  calories: string;
  proteins: string;
}

interface Props {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        display: 'flex',
        maxWidth: 600,
        margin: 'auto',
        position: 'relative'
      }}
      elevation={4}>
      <CardMedia
        component='img'
        sx={{ width: 250, height: 180, objectFit: 'cover' }}
        image={recipe.image}
        alt={recipe.title}
      />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography
            variant='h5'
            component='div'>
            {recipe.title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'>
            {recipe.shortDescription}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <LocalFireDepartment color='action' />
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ ml: 1 }}>
              {recipe.calories} kcal
            </Typography>
            <FitnessCenter
              color='action'
              sx={{ ml: 2 }}
            />
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ ml: 1 }}>
              {recipe.proteins}gr protein
            </Typography>
          </div>
        </CardContent>
        <CardActions
          sx={{ position: 'absolute', bottom: 0, right: 0, mb: 1, mr: 1 }}>
          <Button
            onClick={handleOpen}
            size='small'>
            Show More
          </Button>
        </CardActions>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='recipe-modal-title'
        aria-describedby='recipe-modal-description'>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}>
          <Typography
            id='recipe-modal-title'
            variant='h6'
            component='h2'
            sx={{ color: 'black' }}>
            {recipe.title}
          </Typography>
          <Typography
            id='recipe-modal-description'
            sx={{ mt: 2, color: 'black' }}>
            {recipe.fullRecipe}
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
};
