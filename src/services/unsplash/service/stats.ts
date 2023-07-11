import { StatMonth, StatTotal } from '../models/Stats';
import API from './instance';

const Stats = {
  total: async () => {
    const response = await API.get<StatTotal>('/stats/total');
    return response.data;
  },
  month: async () => {
    const response = await API.get<StatMonth>('/stats/month');
    return response.data;
  },
};

export default Stats
