var babelOptions = {
    "presets": [
        "@babel/preset-react",
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                "targets": {
                    "ie": "10"
                }
            }
        ],
        "@babel/preset-flow"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread"
    ]
  };

module.exports = {
    entry: [
        './src/index.jsx'
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions
                }
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            },
            {
              test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg|gif)$/,
              loader: 'url-loader?limit=100000'
            }
        ]
    },
    output: {
        path: __dirname + '/static',
        filename: 'bundle.js'
    }
};
