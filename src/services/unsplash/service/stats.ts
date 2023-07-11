import API from './instance';

const Stats = {
  total: async () => {
    const response = await API.get('/stats/total');
    return response.data;
  },
  month: async () => {
    const response = await API.get('/stats/month');
    return response.data;
  },
};

export default Stats
