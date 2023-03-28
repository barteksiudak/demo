export type Answer = {
  id: string;
  label: string;
};

export type Survey = {
  id: string;
  label: string;
  answers: Answer[];
};
