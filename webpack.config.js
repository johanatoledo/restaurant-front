import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './src/main.js',           
  output: {
    path: path.resolve(__dirname, 'dist'),  
    filename: 'bundle.js',
    publicPath: '/dist/' 
  },
  mode: 'development',   
  module: {
    rules: [
     
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      },
     
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'front'),
    },
    compress: true,
    port: 3001, 
  },
  resolve: {
    extensions: ['.js']
  }
};
