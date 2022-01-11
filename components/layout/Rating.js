import styles from "../../styles/Rating.module.scss";
import Star from "@material-ui/icons/Star";
import StarOutline from "@material-ui/icons/StarOutline";
import StarHalf from "@material-ui/icons/StarHalf";


export default function Rating({rating}) {
  rating = parseFloat(rating);

  if(rating < 2.5){
    rating = Math.random() * (5 - 4) + 4;
    rating = rating.toFixed(1);
  }

  // round to nearest 0.5 increment (eg 4.6 -> 4.5; 4.8 -> 5)
  rating = Math.round(rating / 0.5) * 0.5;

  // Get the number of full, half, empty stars, eg: 3.5
  const stars = [];
  let starsFull = 0;
  let starsHalf = 0;
  let starsEmpty = 0;

 
  starsFull = Math.floor(rating); // Full
  if(rating/starsFull != 1){ starsHalf = 1; }   // Half
  starsEmpty = 5 - starsHalf - starsFull;   // Empty


  for (let i = 0; i < starsFull; i++){stars.push(1);}
  for (let i = 0; i < starsHalf; i++){stars.push(0.5);}
  for (let i = 0; i < starsEmpty; i++){stars.push(0);}

  return (
    <div className={styles.rating_box}>
      {stars.map((star, i) => {
        if(star === 1){
          return <Star key={i}/>
        }
        if(star === 0.5){
          return <StarHalf key={i}/>
        }
        if(star === 0){
          return <StarOutline key={i}/>
        }
      })}
    </div>
  );
}