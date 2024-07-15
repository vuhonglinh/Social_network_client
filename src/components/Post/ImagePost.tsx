import React from 'react';
import { ImageType } from '@/type/post.type';

const ImagePost = ({ images }: { images: ImageType[] | undefined }) => {
    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-3 gap-2">
            {images.length == 1 ? (images.slice(0, 1).map((image, index) => (
                <div key={index} className="col-span-3 row-span-3 cursor-pointer">
                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image.image}`} alt={`${image.image}`} className="w-full h-full object-cover rounded-lg" />
                </div>
            ))) : (
                images.slice(0, 1).map((image, index) => (
                    <div key={index} className="col-span-2 row-span-2 cursor-pointer">
                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image.image}`} alt={`${image.image}`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                ))
            )}
            {images.length == 2 ? (
                images.slice(1, 3).map((image, index) => (
                    <div key={index} className="col-span-1 row-span-2 cursor-pointer">
                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image.image}`} alt={`${image.image}`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                ))
            ) : (
                images.length === 3 ? (
                    images.slice(1, 3).map((image, index) => (
                        <div key={index} className="col-span-1 row-span-1 cursor-pointer">
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image.image}`} alt={`${image.image}`} className="w-full h-full object-cover rounded-lg" />
                        </div>
                    ))
                ) : (
                    images.slice(1, 2).map((image, index) => (
                        <div key={index} className="col-span-1 row-span-1 cursor-pointer">
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image.image}`} alt={`${image.image}`} className="w-full h-full object-cover rounded-lg" />
                        </div>
                    ))
                )
            )
            }
            {
                images.length > 3 && (
                    <div className="col-span-1 row-span-1 relative cursor-pointer">
                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${images[3].image}`} alt={`${images[3].image}`} className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl cursor-pointer">
                            +{images.length - 3}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ImagePost;
