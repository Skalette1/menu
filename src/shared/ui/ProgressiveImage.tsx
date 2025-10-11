import React from 'react';
import styles from './ProgressiveImage.module.css';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { altFallback?: string };

export const ProgressiveImage: React.FC<Props> = ({ src, alt, altFallback, className, ...rest }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const combinedClassName = `${styles.img} ${loaded ? styles.loaded : ''} ${className ?? ''}`.trim();

  return (
    <div className={styles.wrapper}>
      {!loaded && !error && <div className={styles.skeleton} />}
      {error && <div className={styles.error}>{alt || altFallback || 'Изображение'}</div>}
      <img
        {...rest}
        src={String(src)}
        alt={alt || altFallback || ''}
        className={combinedClassName}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default ProgressiveImage;
