import { clsx } from 'clsx';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import { useRef, useEffect, useState } from 'react';

import styles from './ImageInput.module.scss';
import { Check as CheckIcon } from '~/assets/images/icons/SvgIcons';
import Image from '~/components/Image';

function ImageInput({
  initialImage = null,
  className,
  width = 310,
  height = 310,
  scale = 1.3,
  onAccept,
}) {
  const [avatarPreview, setAvatarPreview] = useState(initialImage);
  const avatarEditorRef = useRef();

  const handlePreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAccept = () => {
    const canvasScaled = avatarEditorRef.current
      .getImageScaledToCanvas()
      .toDataURL();

    onAccept && onAccept(canvasScaled);
  };

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  return (
    <div
      className={clsx([
        styles.wrapper,
        {
          [className]: className,
        },
      ])}
    >
      <div
        style={{
          width: width,
          height: height,
        }}
        className={styles.editorWrapper}
      >
        {avatarPreview ? (
          <AvatarEditor
            className={styles.avatarEditor}
            image={avatarPreview}
            width={width}
            height={height}
            border={0}
            borderRadius={10000000}
            scale={scale}
            rotate={0}
            ref={avatarEditorRef}
          />
        ) : (
          <Image className={styles.avatarEditor} alt="noavatar" />
        )}
      </div>
      <label htmlFor="upload-avatar" className={styles.uploadLabel}>
        Choose a image
      </label>
      <input
        id="upload-avatar"
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={handlePreview}
      />
      {avatarPreview && (
        <button onClick={handleAccept} className={styles.accept}>
          <CheckIcon className={styles.checkIcon} />
        </button>
      )}
    </div>
  );
}

PropTypes.ImageInput = {
  initialImage: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  scale: PropTypes.number,
  onAccept: PropTypes.func,
};

export default ImageInput;
