type MappedBackendMessage = 'accountCreatedSuccessfully';

type StatsAndMessages = {
  [K in MappedBackendMessage]: {
    message: string;
    status?: number;
    fe_message: string;
  };
};

const statsAndMaps: StatsAndMessages = {
  accountCreatedSuccessfully: {
    fe_message: 'Account created successfully',
    message: 'Account created successfully',
    status: 201,
  },
};

export default statsAndMaps;
