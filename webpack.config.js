const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require( "mini-css-extract-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const paths = {
    src: path.resolve(__dirname,'src'),
    html: path.resolve(__dirname,'public','index.html'),
    build: path.resolve(__dirname,'dist'),
    entry: path.resolve(__dirname,'src','index.jsx')
}
module.exports = (env) => {
    const mode = env.mode || 'development';
    const isDev = mode === 'development';
    
    return {
        mode: mode,
        output: {
            path: paths.build,
            filename: "bundle.js",
            clean: true,
            publicPath: '/',
        },
        entry: paths.entry,
        plugins: [
            new ReactRefreshPlugin(),
            new HtmlWebpackPlugin({
                template: paths.html,
            }),
        ],
        devServer: {
            port: 3030, // you can change the port
            hot: true,
            open:true,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.(jsx|jx)$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env'],
                        plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
                      },
                    },
                },
                {
                    test: /\.s[ac]ss/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                          loader: 'css-loader',
                          options: {
                            modules: {
                              auto: (resPath) => Boolean(resPath.includes('.module.')),
                              localIdentName: isDev
                                ? '[path][name]__[local]--[hash:base64:5]'
                                : '[hash:base64:8]',
                            },
                          },
                        },
                        'sass-loader',
                    ]
                }
            ],
        },
        resolve: {
            extensions: ['.js','.jsx'],
            preferAbsolute: true,
            modules: [paths.src,'node_modules'],
            mainFiles: ['index'],
            alias: {},
        }
    }
    
};