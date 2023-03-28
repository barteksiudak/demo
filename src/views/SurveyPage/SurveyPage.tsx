import { useQuery } from 'react-query';
import { getSurvey } from '../../api/survey';
import { Survey } from '../../types';

export default function SurveyPage(): JSX.Element {
  const q = useQuery<Survey>('servey', () => getSurvey());
  console.log(q.data);
  return <div>Survay Page</div>;
}
