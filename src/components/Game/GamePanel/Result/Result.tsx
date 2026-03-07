type Props = {
  score: number;
  total: number;
};

export default function Result({ score, total }: Props) {
  return (
    <div>
      <h2>Quiz Finished</h2>
      <p>
        Score: {score} / {total}
      </p>
    </div>
  );
}
