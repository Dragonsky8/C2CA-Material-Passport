import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface MediaCardProp {
  title: string,
  cardText: string,
  link: string

}

export default function MediaCard({title, cardText, link}: MediaCardProp) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`/${title}.jpeg`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cardText}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={link}>Go to {title}</Button>
      </CardActions>
    </Card>
  );
}