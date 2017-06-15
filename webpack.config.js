const path = require('path');
const node_externals = require('webpack-node-externals');
const autoprefixer = require('autoprefixer');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    entry: './src/components/index.js',
    output: {
        filename: 'helloworld.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Hello',
        libraryTarget: 'commonjs2',
        //umdNamedDefine: true
    },
    externals: [ //node_externals(),
        'react',
        'react-dom'
    ],
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [{
                    options: {
                        formatter: eslintFormatter,

                    },
                    loader: require.resolve('eslint-loader'),
                }, ],
                include: path.resolve('../src'),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            minimize: true,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },

        ]
    },
    plugins: [
        new UglifyJSPlugin({
            dead_code: true,
            drop_debugger: true,
            unused: true
        }),
        new WebpackShellPlugin({
            onBuildStart: ['echo "Starting"'],
            onBuildEnd: ['node fix.js']
        })
    ]
};