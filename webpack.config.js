const {VueLoaderPlugin }= require('vue-loader');
module.exports={
    entry:'./public/indexpag.js',
    output:{
        path:__dirname + '/public/build',
        filename:'bundle.js',
        
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            }, 
            { test: /\.css$/, use: 'css-loader' },   
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ]

};