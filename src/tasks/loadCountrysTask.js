import countriesData from "../data/countries.json";
class LoadCountrysTask{
    load = (setState) => {
        setState(countriesData.features);
    };
}
export default LoadCountrysTask;