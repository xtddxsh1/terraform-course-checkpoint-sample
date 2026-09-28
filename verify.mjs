import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
const root = dirname(fileURLToPath(import.meta.url));
const cli = process.argv[2] || 'terraform';
const env = { ...process.env, CHECKPOINT_DISABLE: '1', TF_IN_AUTOMATION: '1' };
function run(dir, args) {
  const r = spawnSync(cli, args, { cwd: join(root, dir), env, encoding: 'utf8' });
  const output = (r.stdout || '') + (r.stderr || '');
  console.log('> ' + dir + ': terraform ' + args.join(' ') + '\n' + output);
  if (r.error) throw r.error;
  return { status: r.status, output };
}
const results = [];
for (const dir of ['student', 'instructor']) {
  for (const args of [['fmt','-check','-recursive'], ['init','-backend=false','-input=false','-no-color'], ['validate','-no-color']]) {
    if (run(dir,args).status !== 0) throw new Error(dir + ' preflight failed');
  }
  const result = run(dir, ['test','-no-color']);
  if (dir === 'student') {
    if (result.status === 0 || !/1 passed, 2 failed/.test(result.output))
      throw new Error('Starter must detect precisely two failing cases.');
  } else if (result.status !== 0 || !/3 passed, 0 failed/.test(result.output)) {
    throw new Error('Instructor answer must pass all three cases.');
  }
  results.push({directory:dir, exit_code:result.status, expected:true});
}
console.log(JSON.stringify({verified:true, results}, null, 2));
