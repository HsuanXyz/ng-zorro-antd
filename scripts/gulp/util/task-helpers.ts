import * as child_process from 'child_process';
import * as gulp from 'gulp';
const gulpClean = require('gulp-clean');
const resolveBin = require('resolve-bin');

export function cleanTask(glob: string | string[]) {
  return () => gulp.src(glob, { read: false, allowEmpty: true }).pipe(gulpClean(null));
}

export function execTask(binPath: string, args: string[]) {
  return (done: (err?: string) => void) => {
    const env = {...process.env};
    // https://github.com/angular/angular-cli/issues/10922
    // tslint:disable-next-line:no-any
    (process.stdout as any)._handle.setBlocking(true);
    // tslint:disable-next-line:no-any
    (process.stdout as any)._handle.setBlocking(true);
    const childProcess = child_process.spawn(binPath, args, {
      env,
      cwd: process.cwd(),
      stdio: "inherit"
    });

    childProcess.on('close', (code: number) => {
      // tslint:disable-next-line:triple-equals
      code != 0 ? done(`Process failed with code ${code}`) : done();
    });
  };
}

export function execNodeTask(packageName: string, executable: string | string[], args?: string[]) {
  if (!args) {
    args = executable as string[];
    executable = '';
  }

  // tslint:disable-next-line:no-any
  return (done: (err: any) => void) => {
    // tslint:disable-next-line:no-any
    resolveBin(packageName, { executable: executable }, (err: any, binPath: string) => {
      if (err) {
        done(err);
      } else {
        execTask('node', ['--max_old_space_size=5120', binPath].concat(args!))(done);
      }
    });
  };
}