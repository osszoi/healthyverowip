import { Grid } from '@mui/material';
import { RecipeCard } from '../FoodRecipe/FoodRecipe';

export const Recipes = () => {
  const recipes = [
    {
      image:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&resize=440,400',
      title: 'Spaghetti Carbonara',
      shortDescription:
        'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
      fullRecipe: 'Detailed recipe of Spaghetti Carbonara...',
      calories: '500',
      proteins: '25'
    },
    {
      image:
        'https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg',
      title: 'Chicken Curry',
      shortDescription:
        'A rich and hearty curry made with tender chicken pieces and aromatic spices.',
      fullRecipe: 'Detailed recipe of Chicken Curry...',
      calories: '400',
      proteins: '25'
    },
    {
      image:
        'https://simplyceecee.co/wp-content/uploads/2018/07/veganbuddhabowl-2.jpg',
      title: 'Vegan Buddha Bowl',
      shortDescription:
        'A nutritious and colorful mix of raw and cooked vegetables with a tangy dressing.',
      fullRecipe: 'Detailed recipe of Vegan Buddha Bowl...',
      calories: '400',
      proteins: '20'
    },
    {
      image:
        'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/09/Beef-Stew-main.jpg',
      title: 'Beef Stew',
      shortDescription:
        'Slow-cooked beef stew with root vegetables in a thick, savory sauce.',
      fullRecipe: 'Detailed recipe of Beef Stew...',
      calories: '400',
      proteins: '35'
    },
    {
      image:
        'https://scientificallysweet.com/wp-content/uploads/2020/09/IMG_4087-feature-2.jpg',
      title: 'Chocolate Cake',
      shortDescription:
        'A rich, moist chocolate cake with a smooth chocolate frosting.',
      fullRecipe: 'Detailed recipe of Chocolate Cake...',
      calories: '450',
      proteins: '5'
    }
  ];

  return (
    <Grid
      container
      spacing={3}
      rowSpacing={2}>
      {recipes.map((recipe, index) => (
        <Grid
          item
          md={6}
          xs={12}>
          <RecipeCard
            key={index}
            recipe={recipe}
          />
        </Grid>
      ))}
    </Grid>
  );
};
