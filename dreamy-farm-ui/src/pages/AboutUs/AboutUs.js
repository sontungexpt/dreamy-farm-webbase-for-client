import { Trans, useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import styles from './AboutUs.module.scss';
import jpgImages from '~/assets/images/jpgs';

function AboutUs() {
  const { t } = useTranslation('translations');
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.banner}
        src={jpgImages.aboutUs}
        alt="heroImage"
      ></img>
      <div
        style={{
          backgroundImage: `url(${jpgImages.aboutUsBG})`,
        }}
        className={styles.background}
      >
        <div className="grid wide">
          <div className="row">
            <div
              className={clsx(['col', 'l-7', 'm-12', 'c-12', styles.content])}
            >
              <h1>{t('Why Dreamy Farm')}</h1>
              <p>
                The current food supply chain is costly, inefficient, and
                wasteful.Fruits and vegetables' nutrients can easily be lost
                after pickup.
                <br />
                The goal of Dreamy Farm is to make delicious food easily
                accessible to all Vietnamese.We offer a simple complement or
                alternative to conventional distribution methods.Here, you have
                access to high quality food and the ability to enjoy deliveries
                on your schedule, with no upfront fees, or large time
                commitments. Eating sustainably should be a no brainer!
              </p>
            </div>
          </div>

          <div className={clsx(['row', styles.row2])}>
            <div
              className={clsx(['col', 'l-7', 'm-12', 'c-12', styles.content])}
            >
              <h1>{t('What Sets Us Apart')}</h1>
              <p>
                Local sourcing - Network of 10+ farms within the South and the
                North of Vietnam
                <br />
                Grocery Variety - 100+ unique products and recipes bundle
                <br />
                Quality & Freshness — Same-day logistics<br></br>
                Sustainability-focused — Regenerative and organic farms;
                compostable packaging
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
