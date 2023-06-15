//librairies
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { clsx } from 'clsx';

//styles and images
import styles from './Avatar.module.scss';
import jpgImages from '~/assets/images/jpgs';

//components
import { Modal } from '~/components/ModalButton';
import Image from '~/components/Image';
import ImageInput from './ImageInput';
import { Camera as CameraIcon } from '~/assets/images/icons/SvgIcons';
import Trans from '~/components/Trans';

function Avatar({ src }) {
  const [avatar, setAvatar] = useState(src);
  const modalRef = useRef();

  // const dataURLtoFile = (dataurl, filename) => {
  //   let arr = dataurl.split(','),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, { type: mime });
  // };

  return (
    <>
      <div
        onClick={() => modalRef.current.open()}
        className={clsx([styles.avatar])}
      >
        <div className={styles.avatarSquare}>
          <Image
            className={styles.avatarImg}
            src={avatar}
            alt="avatar"
            altSrc={jpgImages.noAvatar}
            fallback={jpgImages.noAvatar}
          />
          <div className={styles.avatarOverlay}>
            <CameraIcon className={styles.cameraIcon} />
          </div>
        </div>
        <h3 className={styles.title}>
          <Trans>Your Avatar</Trans>
        </h3>
      </div>
      <Modal ref={modalRef}>
        <ImageInput
          onAccept={(image) => {
            setAvatar(image);
            modalRef.current.close();
          }}
          className={styles.innerModal}
        />
      </Modal>
    </>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
};

export default Avatar;
