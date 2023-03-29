import { Spinner, Text } from '../../ui';

type AnalyseProps = {
  text: string;
  isLoading: boolean;
};

export default function Anlyse({ text, isLoading }: AnalyseProps): JSX.Element {
  if (isLoading) {
    return <Spinner />;
  }

  if (!text) {
    return <></>;
  }

  return (
    <>
      <Text typography="h3" inline={false}>
        Your analyse!
      </Text>
      {text}
    </>
  );
}
