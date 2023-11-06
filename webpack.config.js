const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resolveTsconfigPathsToAlias = require('./resolve-tsconfig-path-to-alias');

const path = require('path');
const isProd = (process.env.NODE_ENV === 'production');
const glob = require("glob");

function getEnvironment() {
  return isProd ? "production" : "development";
}

function getPlugins() {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': 'development'
      }
    }),

    new webpack.ProvidePlugin({
      'window.Dropzone': 'dropzone',
    }),

    new MiniCssExtractPlugin({
      filename: isProd ? '[name]-[hash:6].min.css' : 'style.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/app/index.html')
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "sourcemap/[file].map"
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /pt/),
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        tslint: {
          configuration: require('./tslint.json'),
          typeCheck: true
        }
      }
    }),
    /**
     * window.moment foi removido do ProvidePlugin abaixo pois causava problema na tradução do componente nsj-date-picker
     * Para mais info, consultar PR: https://github.com/Nasajon/nasajon-ui/pull/234 (tarefas 45718 / 42719)
     */
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      '$': 'jquery',
      'jQuery': 'jquery',

      // 'window.moment': 'moment',
      'moment': 'moment'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "src/assets/img/**/*"),
      to: path.resolve(__dirname, "dist")
    },
    {
      from: path.resolve(__dirname, "src/assets/sass/**/*"),
      to: path.resolve(__dirname, "dist")
    },
    {
      from: path.resolve(__dirname, "src/config/*"),
      to: path.resolve(__dirname, "dist")
    }
    ])
  ];

  return plugins;
}


module.exports = {
  devtool: isProd ? 'source-map' : 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    disableHostCheck: true
  },

  mode: getEnvironment(),

  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.ts', '.js'],
    alias: resolveTsconfigPathsToAlias(),
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    runtimeChunk: 'single',
    nodeEnv: getEnvironment(),
    minimizer: isProd ? [
      new TerserPlugin({})
    ] : []
  },

  entry: {

    vendor: [

      // recursos do AngularJs
      './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
      './node_modules/angular-messages/angular-messages.min.js',
      './node_modules/angular-animate/angular-animate.min.js',
      './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      './node_modules/angular-sanitize/angular-sanitize.min.js',
      './node_modules/angularjs-toaster/toaster.min.js',
      './node_modules/angular-input-masks/src/angular-input-masks.js',
      './node_modules/angular-locale-pt-br/angular-locale_pt-br.js',
      './node_modules/blip-chat-widget/dist/blip-chat.js',

      './node_modules/moment/min/moment.min.js',
      './node_modules/moment/locale/pt-br.js',
      './node_modules/angular-moment/angular-moment.min.js',
      './node_modules/moment-timezone/builds/moment-timezone-with-data.min.js',

      // recursos dependentes do AngularJs
      './node_modules/ui-select/dist/select.min.js',
      './node_modules/checklist-model/checklist-model.js',

      // Bootstrap 
      './node_modules/bootstrap/dist/js/bootstrap.min.js',
      './node_modules/nasajon-ui/nasajon-ui-old/utils/nsj-routing.js',

      // para não recarregar o AngularJs
      './node_modules/nasajon-ui/lib/nasajon-ui.ts',
      './src/app/shared/components/tree/tree.js',

      //Compatibilidade Nasajon-ui
      './node_modules/nasajon-ui/nasajon-ui-old/utils/nsj/globals/globals.min.js',
      './node_modules/nasajon-ui/nasajon-ui-old/forms/js/convert_to_number.js',
      './node_modules/nasajon-ui/nasajon-ui-old/utils/is_state_filter.js',
      './node_modules/nasajon-ui/nasajon-ui-old/utils/debounce.js',
      './node_modules/nasajon-ui/nasajon-ui-old/tables/objectlist.js',
      './node_modules/nasajon-ui/nasajon-ui-old/date-picker/date-picker.js',
      './src/app/app.module.ts',

      // dropzone
      './node_modules/multiple-date-picker/dist/multipleDatePicker.js',
      './node_modules/nasajon-ui/nasajon-ui-old/forms/js/date_input.js',

      // Dependências do Angular JSON Schema Form
      './node_modules/tv4/tv4.js',
      './node_modules/objectpath/lib/ObjectPath.js',
      './node_modules/angular-schema-form/dist/schema-form.js',
      './node_modules/angular-schema-form-bootstrap/bootstrap-decorator.js',

      // core
      './src/bootstrap-angular.ts'
    ],


    styles: [
      './node_modules/ui-select/dist/select.css',
      './node_modules/angularjs-toaster/toaster.min.css',
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/@fortawesome/fontawesome-free/css/all.min.css',
      './src/assets/sass/style.scss',
      './node_modules/multiple-date-picker/dist/multipleDatePicker.css'
    ],
    custom: glob.sync("./src/app/modules/**/*.ts")

  },
  output: {
    filename: isProd ? '[name]-[hash:6].min.js' : '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  plugins: getPlugins(),

  module: {

    rules: [
      {
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/nasajon-ui'),
        ],

        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
              happyPackMode: true
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          !isProd ? 'style-loader' : MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
          },
          {
            loader: 'resolve-url-loader',
            options: {
              debug: true,
              root: __dirname
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html?$/,
        include: /node_modules/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader?outputPath=img/',
      },

      {
        test: /\.(svg|woff|woff2|eot|ttf)$/,
        use: 'file-loader?outputPath=fonts/',
      },
    ]
  }
};