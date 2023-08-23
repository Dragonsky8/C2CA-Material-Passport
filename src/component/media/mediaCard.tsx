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
  link: string,
  useDefaultImage?: boolean

}

export default function MediaCard({title, cardText, link, useDefaultImage=false}: MediaCardProp) {

  var imgAddress = `/${title.toLowerCase()}.jpeg`
  if (useDefaultImage) {
    imgAddress = '/default.jpeg'
  }
  return (
    <Card sx={{ maxWidth: 345, minWidth: 200 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imgAddress}
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