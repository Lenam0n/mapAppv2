import { useEffect, useState } from 'react';
import ResoMap from '../component/map.js';
import LoadCountrysTask from '../tasks/loadCountrysTask';

const Wrapper = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const load = () => {
        const loadTask = new LoadCountrysTask();
        loadTask.load(setCountries);
    }

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        if (countries.length > 0) {
            setIsLoading(false);
        }
    }, [countries]);

    return (
        <div>
            {!isLoading && <ResoMap countries={countries} />}
        </div>
    );
};

export default Wrapper;
