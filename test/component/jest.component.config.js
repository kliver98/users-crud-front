module.exports = {
    //preset: 'ts-jest',
    //testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["./setupTests.js"],
    transform: {
        "^.+\\.js$": "../../node_modules/babel-jest",
        ".*\\.(vue)$": "../../node_modules/vue-jest"
    },
    // moduleNameMapper: {
    //     "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    // },
    moduleFileExtensions: [
        "js",
        "json",
        "vue"
      ]
  
};