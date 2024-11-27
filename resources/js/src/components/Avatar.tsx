import React, { useEffect, useState } from 'react';
import { cn } from '../utils/util';

type ImageSize = 'xs' | 'sm' | 'md' | 'lg';
type ImageShape = 'square' | 'rounded' | 'circle';

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: ImageSize;
    shape?: ImageShape;
}

const sizeClasses: Record<ImageSize, string> = {
    xs: 'w-10 h-10',
    sm: 'w-14 h-14',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
};

const sizeDimensions: Record<ImageSize, number> = {
    xs: 40,
    sm: 56,
    md: 64,
    lg: 80,
};

const shapeClasses: Record<ImageShape, string> = {
    square: '',
    rounded: 'rounded-md',
    circle: 'rounded-full',
};

/**
 * CustomImage is a React component that renders an image.
 * It accepts a size property that is one of 'xs', 'sm', 'md', 'lg' to determine the size of the image.
 * It also accepts a shape property that is one of 'square', 'rounded', 'circle' to determine the shape of the image.
 * If the image fails to load, it will display a placeholder image of the same size and shape.
 * @param {ImageSize} [size='md'] The size of the image.
 * @param {ImageShape} [shape='square'] The shape of the image.
 * @param {string} [className] Additional CSS classes to apply to the image.
 * @param {string} [src] The src of the image. If not provided, the image will be empty.
 * @param {string} [alt='Image'] The alt text of the image.
 * @param {React.ImgHTMLAttributes<HTMLImageElement>} [props] Additional props to pass to the image element.
 * @return {JSX.Element} The rendered image element.
 */
const Avatar: React.FC<CustomImageProps> = ({ size = 'md', shape = 'square', className, src, alt = 'Image', ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const dimension = sizeDimensions[size];
    const placeholderSrc = `https://placehold.co/${dimension}x${dimension}`;

    const handleError = () => {
        setImgSrc(placeholderSrc);
    };

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return <img className={cn('overflow-hidden object-cover', sizeClasses[size], shapeClasses[shape], className)} src={imgSrc || placeholderSrc} alt={alt} onError={handleError} {...props} />;
};

export default Avatar;
