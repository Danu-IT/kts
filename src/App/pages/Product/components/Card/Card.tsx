import Button from '@components/Button'
import { ProductData } from '@type/index'

import styles from './Card.module.scss'
import SwiperCustom from '../SwiperCustom'

export type CardProps = {
  product: ProductData
}

const Card = ({ product }: CardProps) => {
  return (
    <div className={styles.card}>
      {product && (
        <div className={styles.card}>
          <SwiperCustom slides={product.images}></SwiperCustom>
          <div className={styles.card__content}>
            <h2 className={styles.card__title}>{product.title}</h2>
            <span className={styles.card__subtitle}>{product.description}</span>
            <span className={styles.card__price}>${product.price}</span>
            <div className={styles.card__btns}>
              <Button>Buy Now</Button>
              <Button color="light">Add to Cart</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card
