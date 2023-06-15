import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';

import properties from '~/configs';
import route from '~/routes';
import db from '~/configs/database';
import { initialProducts, initialRecipes } from '~/utils/initial';

const app = express();
const PORT = process.env.PORT || properties.PORT;

app.use(express.static('public'));
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

db.connect();

initialProducts();
initialRecipes();

route(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
