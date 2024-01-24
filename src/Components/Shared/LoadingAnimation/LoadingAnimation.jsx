const loadingAnimation = "https://i.ibb.co/bLC9VDH/loading-Animation.gif";

const LoadingAnimation = () => {
    return (
        <div className="h-[700px] flex justify-center items-center">
            <img src={loadingAnimation} alt="" />
        </div>
    );
};

export default LoadingAnimation;