import css from './playground.module.css';

export default function PlaygroundPage() {
  return (
    <section className={`container ${css.page}`}>
      <div className={css.card}>
        <p className={css.eyebrow}>Playground</p>
        <h1 className={css.title}>Experiment with story ideas</h1>
        <p className={css.description}>
          This space is ready for demos, story-generation experiments, and future interactive tools.
        </p>
      </div>
    </section>
  );
}
