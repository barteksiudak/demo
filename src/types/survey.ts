export type Answer = {
  id: string;
  label: string;
};

export type Survey = {
  id: string;
  label: string;
  answers: Answer[];
};

export type Result = {
  title: string;
  text: string;
};
