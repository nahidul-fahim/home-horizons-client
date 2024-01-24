


const bannerImg = "https://i.ibb.co/56kCzLN/home-Page-House.png";

const Banner = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center w-full gap-10">

            {/* description */}
            <div className="flex flex-col w-full md:w-[50%] justify-center items-start gap-2 order-2 md:order-1">
                <h1 className="text-5xl lg:text-6xl font-heading font-semibold text-main">Find your</h1>
                <h1 className="text-5xl lg:text-6xl font-heading font-semibold text-sub">Dream house</h1>
                <p className="font-body text-gray">Discover your ideal rental home effortlessly. Advanced search, detailed listings, and seamless process. Your dream home is just a click away!</p>
            </div>

            {/* image */}
            <div className="w-full md:w-[50%] order-1 md:order-2">
                <img src={bannerImg} alt="banner image" className="rounded-bl-[200px]" />
            </div>
        </div>
    );
};

export default Banner;