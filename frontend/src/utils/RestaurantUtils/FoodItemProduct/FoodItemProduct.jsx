import { useState } from 'react';

import css from './FoodItemProduct.module.css';

import starGIcon from '/icons/starGIcon.png';
import starGrIcon from '/icons/starGrIcon.png';
import heartOutline from '/icons/heart-outline.png'; // Import heart outline icon
import heartFilled from '/icons/heart-filled.png';   // Import heart filled icon

const FoodItemProduct = (props) => {
    let { imgSrc, ttl, votes, price, desc, vegNonveg, mustTry } = props.data;
    let dataset = props?.dataset;

    const [readMore, setReadMore] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <div className={css.outerDiv} data-id={dataset} id={props.id}>
            <div className={css.innerDiv}>
                {imgSrc ? (
                    <div className={css.imgBox}>
                        <img src={imgSrc} className={css.img} alt="food item" />
                        <img src={vegNonveg} className={css.typeImg} alt="veg or nonveg" />

                        {/* Heart Button */}
                        <button className={css.heartButton} onClick={toggleFavorite}>
                            <img
                                src={isFavorited ? heartFilled : heartOutline}
                                className={css.heartIcon}
                                alt="favorite"
                            />
                        </button>
                    </div>
                ) : (
                    <img src={vegNonveg} className={css.typeImg2} alt="veg or nonveg" />
                )}
                <div className={css.box}>
                    <div className={css.ttl}>{ttl}</div>
                    {mustTry ? <div className={css.tag}>MUST TRY</div> : ''}
                    <div className={css.ratings}>
                        <div className={css.stars}>
                            <img src={starGIcon} className={css.starIcon} alt="star" />
                            <img src={starGIcon} className={css.starIcon} alt="star" />
                            <img src={starGIcon} className={css.starIcon} alt="star" />
                            <img src={starGrIcon} className={css.starIcon} alt="star" />
                            <img src={starGrIcon} className={css.starIcon} alt="star" />
                        </div>
                        <div className={css.votesTxt}>{votes} votes</div>
                    </div>
                    <div className={css.price}>₹{price}</div>
                    <div className={css.desc}>
                        {readMore ? desc : desc.substring(0, 100)}
                        ...
                        {!readMore && (
                            <span className={css.readMore} onClick={() => setReadMore(true)}>
                                read more
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodItemProduct;
