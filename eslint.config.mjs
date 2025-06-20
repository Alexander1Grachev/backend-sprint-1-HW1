import prettierPlugin from 'eslint-plugin-prettier';//интеграция Prettier как ESLint-правило
import prettierConfig from 'eslint-config-prettier';// отключает ESLint-правила, конфликтующие с Prettier
import typescriptPlugin from '@typescript-eslint/eslint-plugin';//плагин и парсер - для TypeScript-специфичного линтинга
import typescriptParser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['node_modules', 'dist'],
    },
    {
        files: ['**/*.ts'],// Применяется только к .ts файлам
        languageOptions: {
            ecmaVersion: 'latest', // Современный JS
            sourceType: 'module',// ES-модули
            parser: typescriptParser,// Парсер TypeScript
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,// TS-правила
            prettier: prettierPlugin, // Интеграция Prettier
        },
        rules: {
            'prettier/prettier': 'error',// Ошибка при несоответствии Prettier
            '@typescript-eslint/no-unused-vars': 'warn',// Предупреждение на неиспользуемые переменны
            eqeqeq: ['error', 'always'],// Требует === вместо ==
        },
    },
    prettierConfig,// Отключает конфликтующие с Prettier ESLint-правила
];