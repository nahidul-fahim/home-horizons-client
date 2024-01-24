import AllHouses from "./AllHouses";
import Banner from "./Banner";


const Home = () => {
    return (
        <div className="container mx-auto px-5">
            <Banner />
            <AllHouses />
        </div>
    );
};

export default Home;