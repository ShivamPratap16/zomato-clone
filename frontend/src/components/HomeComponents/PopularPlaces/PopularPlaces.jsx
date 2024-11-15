import { useState } from 'react';
import PlacesCard from '../../../utils/Cards/card3/PlacesCard';
import ShowMore from '../../../utils/Cards/card3/ShowMore'; // Make sure ShowMore is correctly imported
import css from './PopularPlaces.module.css';

let PopularPlaces = () => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(prevState => !prevState);
    };

    return (
        <div className={css.outerDiv}>
            <div className={css.title}>
                <span className={css.titleTxt}>Popular localities in and around</span>
                <span className={css.bld}> Pune</span>
            </div>
            <div className={css.placesCards}>
                <PlacesCard place="Koregaon Park" count="350" link="/koregaonpark" />
                <PlacesCard place="Viman Nagar" count="275" link="/vimannagar" />
                <PlacesCard place="Baner" count="400" link="/baner" />
                <PlacesCard place="Kalyani Nagar" count="290" link="/kalyaninagar" />
                <PlacesCard place="Hinjewadi" count="320" link="/hinjewadi" />
                <PlacesCard place="Magarpatta" count="310" link="/magarpatta" />

             
               
            </div>
        </div>
    );
};

export default PopularPlaces;
