import { Link } from 'react-router-dom';

import css from './ShowcaseCard.module.css';

import biryani from '/images/profilebanner.jpg';
import upArrowIcon from '/icons/up-arrow-icon.png';
import maxSAfety from '/icons/maxsafty.png';
import safeDelivery from '/icons/safe-delivery.png';
import star from '/icons/star.png';
import heartOutline from '/icons/heart-outline.png'; // Import heart outline icon
import heartFilled from '/icons/heart-filled.png';   // Import heart filled icon

import { useState } from 'react'; // Import useState

let ShowcaseCard = (props) => {
    const { link2, promoted, time, offB, proExtraB, off, proExtra, name, rating, imgSrc } = props;
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavorite = (e) => {
        e.preventDefault(); // Prevent Link navigation when clicking the heart
        setIsFavorited(!isFavorited);
    };

    let link = "/" + "hyderabad/paraside/order";
    return (
        <Link className={css.outerDiv} to={link}>
            <div className={css.innerDiv}>
                <div className={css.imgBox}>
                    {promoted && <div className={css.promoted}>Promoted</div>}
                    <img className={css.img} src={imgSrc} alt="food image" />
                    {offB && <div className={css.off}>{off}% OFF</div>}
                    {proExtraB && <div className={css.offPro}>Pro extra {proExtra}% OFF</div>}
                    <div className={css.duration}>{time} min</div>

                    {/* Heart button */}
                    <button className={css.heartButton} onClick={toggleFavorite}>
                        <img
                            src={isFavorited ? heartFilled : heartOutline}
                            alt="Favorite"
                            className={css.heartIcon}
                        />
                    </button>
                </div>
                <div className={css.txtBox}>
                    <div className={css.titleBox}>
                        <div className={css.title}>{name}</div>
                        <div className={css.ratingBox}>
                            {rating} <img className={css.star} src={star} alt="star icon" />
                        </div>
                    </div>
                    <div className={css.tagBox}>
                        <div className={css.tagTitle}>South Indian</div>
                        <div className={css.tagTxt}>
                            ₹<span className={css.type}>350</span> for <span className={css.num}>One</span>
                        </div>
                    </div>
                </div>
                <div className={css.footer}>
                    <div className={css.scroll1}>
                        <div className={css.lg1}>
                            <img className={css.upArrow} src={upArrowIcon} alt="growing arrow" />
                        </div>
                        <div className={css.ordersPlaces}>9000+ orders placed from here recently</div>
                        <div className={css.lg2}>
                            <img className={css.maxSafety} src={maxSAfety} alt="max safety" />
                        </div>
                    </div>
                    <div className={css.scroll2}>
                        <div className={css.lg1}>
                            <img className={css.upArrow} src={upArrowIcon} alt="max safety" />
                        </div>
                        <div className={css.ordersPlaces}>
                            Follows all max safety measures to ensure your food is safe
                        </div>
                        <div className={css.lg2}>
                            <img className={css.safeDelivery} src={safeDelivery} alt="safe delivery" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ShowcaseCard;
