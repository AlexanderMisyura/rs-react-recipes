import Link from 'next/link';
const sadCat = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠤⠒⠀⠈⠓⠠⠐⠢⠄⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⠠⠤⠀⠀⠄⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠦⠤⠒⠒⠒⠠⣀⠀
⠀⡔⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣣
⣔⠀⠤⠄⣀⣀⠀⠀⠀⠀⠀⠀⣠⡂⠀⠀⠀⠲⣄⣀⠀⠀⠀⠀⢀⡤⠒⠈⠀
⠀⠀⠀⠀⠀⠌⠀⠀⠀⢠⠖⣁⡀⠈⠀⠀⠀⡌⢠⣄⠑⡄⠀⠀⠉⠂⠀⠀⠀
⠀⠀⠀⠀⡜⠀⠀⠀⢠⠃⢸⣿⣽⠀⠀⠀⠀⠇⢿⣷⠇⠘⠀⠀⠀⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⢄⠀⠉⢉⡔⠀⠀⠀⠈⢆⠁⠀⢀⠃⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡄⠀⠀⠀⠀⠈⠑⠒⠉⠀⢀⡴⣀⠀⠀⠉⠐⠁⠀⠀⠀⡀⠀⠀⠀
⠒⠒⠒⠂⠘⡀⠐⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠐⠒⠀⠠⠤⠃⠤⠠⠄
⠀⠀⠀⠀⠀⢘⣤⠌⠀⠀⠀⠀⠀⠀⠐⠒⠂⠀⠀⠀⠁⠒⠤⡴⢁⣀⠀⠀⠀
⠀⠀⠒⠂⠈⠀⠀⠱⡴⠉⠑⠉⡵⠂⠀⠀⠀⡔⢲⠒⠖⠒⠊⠀⠀⠀⠉⠉⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠣⠴⢇⡠⠅⠘⠉⠉⠁⢄⣀⣠⣀⠄⠀⠀⠀⠀⠀⠀⠀`;

export default function RootNotFound() {
  return (
    <div>
      <pre>{sadCat}</pre>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist</p>
      <Link href="/recipes">Go to Recipes</Link>
    </div>
  );
}
