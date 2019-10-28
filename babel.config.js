module.exports = {
  presets: [
    ["@babel/preset-env",
      {

        targets: {
          // browser version
        },
        corejs: "3",
        useBuiltIns: "usage"
      }
    ]
  ]
}