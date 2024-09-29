import React from 'react';

const Reviews = () => {
    return (
        <div className="mx-auto px-4 py-16 mt-8 text-center">
            <h2 className="text-3xl font-bold mb-12">
                Join over 10 million people learning on Brilliant
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
                <img src="/nytimes-logo.png" alt="The New York Times" className="h-6 opacity-50" />
                <img src="/atlantic-logo.png" alt="The Atlantic" className="h-6 opacity-50" />
                <div className="flex items-center">
                    <span className="text-yellow-400 text-2xl mr-2">★★★★★</span>
                    <span className="text-sm">
                        Over 50,000 5-star reviews on<br />
                        iOS App Store and Google Play
                    </span>
                </div>
                <div className="flex items-center">
                    <img src="/trustpilot-logo.png" alt="Trustpilot" className="h-6 mr-2" />
                    <div className="flex flex-col items-start">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-xs">TrustScore 4.7 2,133 reviews</span>
                    </div>
                </div>
                <img src="/app-store-badge.png" alt="Apple App Store App of the Day" className="h-10" />
                <img src="/google-play-badge.png" alt="Google Play Store Best App" className="h-10" />
            </div>

        </div>
    );
};

export default Reviews;