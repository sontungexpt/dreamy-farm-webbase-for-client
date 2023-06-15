import mongoose from 'mongoose';
import properties from '~/configs';

const dbConfigs = properties.DB;

async function connect() {
  try {
    // await mongoose.connect(
    //   `mongodb://${dbConfigs.HOST}:${dbConfigs.PORT}/${dbConfigs.NAME}`,
    //   {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   },
    // );
    await mongoose.connect(
      `mongodb+srv://sontungexpt:sontungexpt@cluster0.dlbsxe8.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database connection failed');
  }
}

export default { connect };
