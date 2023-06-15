import styles from './E404.module.scss';
import Button from '~/components/Button';
import { routes as routeConfigs } from '~/configs';
import gifs from '~/assets/gifs';

function E404() {
  return (
    <div className="grid wide">
      <div className="row">
        <div className="col l-o-0 ">
          <div className={styles.four_zero_four_bg}>
            <h1 className={styles.header}>Error 404 </h1>
            <img
              src={gifs.e404}
              alt="gif"
              className={styles.four_zero_four_bg}
            />

            <div className={styles.box404}>
              <h3>Look like you're lost</h3>

              <p>The page you are looking for not avaible!</p>

              <Button primary to={routeConfigs.root} className={styles.btn}>
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default E404;
