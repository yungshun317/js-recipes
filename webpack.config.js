const path = require("path");

const config = {
    mode: "development",
    entry: [
        __dirname + "/src/js/controller.js",
        __dirname + "/src/sass/main.scss"
    ],
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'bundled.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }, {
                test: /\.(s(a|c)ss)$/,
                // use: ['style-loader','css-loader', 'sass-loader']
                use: [
                    {
                        loader: "file-loader",
                        options: { outputPath: ".", name: "style.css" }
                    },
                    "sass-loader"
                ]
            }
        ]
    },
}

module.exports = config;