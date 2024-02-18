import { Grid } from '@mui/material';
import Logo from '../../assets/logo.png';

export const Assets = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>Logo</span>

          <img
            src={Logo}
            height='80px'
            width='80px'
            style={{ borderRadius: '50%' }}
          />
        </div>
      </Grid>
    </Grid>
  );
};
