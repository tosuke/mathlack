import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import gas from 'rollup-plugin-gas'
import { minify } from 'uglify-es'

export default {
  entry: 'src/main.js',
  dest: 'dist/code.js',
  format: 'es',
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      runtimeHelpers: true,
      externalHelpers: true,
      exclude: 'node_modules/**',
    }),
    gas(),
    uglify({ie8: true}, minify),
  ],
}