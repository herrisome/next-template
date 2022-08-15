import clsx, { ClassValue } from 'clsx';
import Image, { ImageProps } from 'next/image';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

function clsxM(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}

type NextImageProps = {
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
  alt: string;
  width: string | number;
} & (
  | { width: string | number; height: string | number }
  | { layout: 'fill'; width?: string | number; height?: string | number }
) &
  ImageProps;

/**
 * @description 必须使用设置宽度 `w-` className
 * @param useSkeleton 添加带有脉冲动画的背景, 如果图像是透明的，请不要使用它
 * @param src
 * @param width
 * @param height
 * @param alt
 * @param className
 * @param imgClassName
 * @param blurClassName
 * @param rest
 */
export default function NextImage({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  ...rest
}: NextImageProps) {
  const [status, setStatus] = React.useState(
    useSkeleton ? 'loading' : 'complete'
  );
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <Image
        className={clsxM(
          imgClassName,
          status === 'loading' && clsxM('animate-pulse', blurClassName)
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={() => setStatus('complete')}
        layout='responsive'
        {...rest}
      />
    </figure>
  );
}
