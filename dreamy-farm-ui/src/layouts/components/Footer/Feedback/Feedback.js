import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { clsx } from 'clsx';

import PropTypes from 'prop-types';
import Button from '~/components/Button';
import { addFeedback } from '~/apiServices/userServices';

function Feedback({
  title = 'Send feedback',
  placeholder = 'Enter your feedback',
  sendTitle = 'Send',

  className,
  titleClassName,
  textareaClassName,
  sendButtonClassName,

  onSubmit,

  ...props
}) {
  const { t } = useTranslation();
  const { loggedIn, email } = useSelector((state) => state.user);
  const [feedback, setFeedback] = useState('');

  const handleSendFeedback = async (e) => {
    onSubmit && onSubmit(e);
    e.preventDefault();
    if (!loggedIn) {
      toast.warning(t('Please login to send feedback'));
      return;
    }
    if (!feedback) {
      toast.warning(t('Please enter your feedback'));
      return;
    }

    await addFeedback({
      email,
      content: feedback,
    });
    setFeedback('');
  };
  return (
    <form onSubmit={handleSendFeedback}>
      <div
        {...props}
        className={clsx([
          {
            [className]: className,
          },
        ])}
      >
        <h2
          className={clsx([
            {
              [titleClassName]: titleClassName,
            },
          ])}
        >
          {t(title)}
        </h2>
        <textarea
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={t(placeholder)}
          className={clsx([
            {
              [textareaClassName]: textareaClassName,
            },
          ])}
        />
        <Button
          type="submit"
          primary
          className={clsx([
            {
              [sendButtonClassName]: sendButtonClassName,
            },
          ])}
        >
          {t(sendTitle)}
        </Button>
      </div>
    </form>
  );
}

Feedback.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  sendTitle: PropTypes.string,

  className: PropTypes.string,
  titleClassName: PropTypes.string,
  textareaClassName: PropTypes.string,
  sendButtonClassName: PropTypes.string,

  onSubmit: PropTypes.func,
};

export default Feedback;
