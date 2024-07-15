import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ImageType } from '@/type/post.type';
import { useEffect, useState } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-image-gallery/styles/css/image-gallery.css";

type ImageSliderType = {
    original: string;
    thumbnail: string;
}

export default function SliderImage({
    children, images
}: {
    children: React.ReactNode,
    images: ImageType[] | undefined
}) {
    const [imageSlider, setImageSlider] = useState<ImageSliderType[]>([])

    useEffect(() => {
        if (images) {
            const data = images.map(image => ({
                original: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image.image}`,
                thumbnail: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image.image}`,
            }));
            setImageSlider(data);
        }
    }, [images]);


    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>{children}</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[60%]">
                <div className="grid gap-4 py-4">
                    <ImageGallery items={imageSlider} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
