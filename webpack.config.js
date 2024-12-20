const path = require('path');
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        'web-bml': './lib/index.ts',
        'web-bml-worker': './lib/worker.ts',
        arib: './client/index.ts',
        play_local: './client/play_local.ts',
        video_list: './client/video_list.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: {
            type: 'umd',
        },
        globalObject: 'this',
    },
    bail: true,
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /.*\.css$/,
                type: 'asset/source',
            }
        ],
    },
    resolve: {
        extensions: [
            '.ts', '.js', '.tsx'
        ],
        fallback: {
            fs: false,  // for css (reworkcss-css)
            path: false,  // for css (reworkcss-css)
            url: false,  // for source-map-resolve
            vm: false,  // for JS-Interpreter
        },
    },
    devtool: 'source-map',
    // babelのため
    plugins: [
        new webpack.ProvidePlugin({
            acorn: path.resolve(__dirname, 'JS-Interpreter', 'acorn.js')  // for JS-Interpreter
        }),
    ],
};

if (process.env.NODE_ENV == null) {
    module.exports.mode = 'development';
}
