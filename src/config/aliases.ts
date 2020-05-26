import moduleAlias from 'module-alias';
import path from 'path';


const rootFolder = process.env.NODE_ENV === 'development'
  ? 'src'
  : 'dist';

const rootPath = path.resolve(__dirname, '..', '..', rootFolder);
moduleAlias.addAliases({
  '@src': rootPath,
});
