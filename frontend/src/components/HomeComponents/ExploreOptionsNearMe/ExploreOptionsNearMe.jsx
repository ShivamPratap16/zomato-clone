import CollapsableCard from '../../../utils/Cards/CollapsableCard/CollapsableCard'

import css from './ExploreOptionsNearMe.module.css';

let ExploreOptionsNearMe = () => {
    let chain = [ 'hyd', 'cheenai', 'vizag', 'mumbai', 'delhi', 'pune', 'bangalore', 'kolkata', 'jaipur', 'ahmedabad',
        'surat', 'lucknow', 'kanpur', 'nagpur', 'indore', 'thane', 'bhopal', 'patna', 'vadodara', 'ghaziabad',
        'ludhiana', 'agra', 'nashik', 'faridabad', 'meerut', 'rajkot', 'varanasi', 'srinagar', 'aurangabad', 
        'dhanbad', 'amritsar', 'vijayawada', 'jodhpur', 'madurai', 'gwalior', 'guwahati', 'coimbatore', 'hubli',
        'mangalore', 'noida', 'kochi', 'jabalpur', 'udaipur', 'ranchi', 'allahabad', 'jhansi', 'shillong',
        'tirupati', 'raipur', 'pondicherry', 'mysore']
    return <div className={css.outerDiv}>
        <div className={css.innerDiv}>
            <div className={css.title}>Explore options near me</div>
            <div className={css.cards}>
                <CollapsableCard title="Top Restaurant Chains" content={chain} />
                <CollapsableCard title="Cities We Deliver To" content={chain} />
            </div>
        </div>
    </div>
}

export default ExploreOptionsNearMe;