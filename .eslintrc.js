module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard-with-typescript", 
        "plugin:prettier/recommended", 
        "eslint:recommended", 
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    "plugins": ["@typescript-eslint", "import", "prettier"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname
    },
    "rules": {
        "prettier/prettier": "error",
        "@typescript-eslint/no-explicit-any": ["off"]
    },
    "files": [ "lambdas/**/*.spec.ts", "**/*.spec.ts" ]
}
