import http, { getEndpoint } from '../compositions/http';
import { Survey } from '../types';
import { HttpResponse } from '../types/http';
import { GET_SURVEY } from './endpoints';

export const survey = () => (): Promise<HttpResponse<Survey>> => {
  const url = getEndpoint(GET_SURVEY);
  return http<Survey>({ url });
};

export const getSurvey = async (): Promise<Survey> => {
  const { data } = await survey()();
  return data;
};
